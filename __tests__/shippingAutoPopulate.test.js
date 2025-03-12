/**
 * @file shippingAutoPopulate.test.js
 * @description Jest test suite for shippingAutoPopulate.js
 * @author
 *
 * Parameter(s):
 *   None
 *
 * Additional Info:
 *   - Mocks NetSuite modules
 *   - Tests the MVC logic for client script
 *   - Targets at least 90% coverage
 * @version 1.0
 */

jest.mock('N/record', () => ({
    setValue: jest.fn(),
    getValue: jest.fn()
}))

jest.mock('N/query', () => ({
    runSuiteQL: jest.fn()
}))

jest.mock('N/log', () => ({
    debug: jest.fn(),
    error: jest.fn()
}))

jest.mock('N/translation', () => ({
    get: jest.fn().mockReturnValue('Translation mock')
}))

const shippingAutoPopulate = require('../src/FileCabinet/SuiteApps/com.turing.12345/shippingAutoPopulate.js')

describe('shippingAutoPopulate Client Script', () => {
    let context

    beforeEach(() => {
        context = {
            currentRecord: {
                getValue: jest.fn(),
                setValue: jest.fn()
            },
            fieldId: 'entity'
        }
    })

    /**
     * @description Ensures pageInit logs debug without error
     * @param {void}
     * @returns {void}
     */
    test('pageInit logs debug without error', () => {
        expect(() => {
            shippingAutoPopulate.pageInit(context)
        }).not.toThrow()
    })

    /**
     * @description Verifies fieldChanged calls runSuiteQL for valid customer
     * @param {void}
     * @returns {void}
     */
    test('fieldChanged - valid customer scenario', async () => {
        const mockRunSuiteQL = require('N/query').runSuiteQL
        mockRunSuiteQL.mockResolvedValue({
            asMappedResults: () => [{ defaultaddress: '123 Main St' }]
        })
        context.currentRecord.getValue.mockReturnValue('100')
        await shippingAutoPopulate.fieldChanged(context)
        expect(mockRunSuiteQL).toHaveBeenCalled()
        expect(context.currentRecord.setValue).toHaveBeenCalledTimes(2)
    })

    /**
     * @description Verifies handling of query failure for invalid customer
     * @param {void}
     * @returns {void}
     */
    test('fieldChanged - invalid customer scenario', async () => {
        const mockRunSuiteQL = require('N/query').runSuiteQL
        mockRunSuiteQL.mockImplementation(() => {
            throw new Error('QUERY_FAILED')
        })
        context.currentRecord.getValue.mockReturnValue('')
        await shippingAutoPopulate.fieldChanged(context)
        expect(mockRunSuiteQL).toHaveBeenCalled()
    })

    /**
    *  NEW TESTS.
    */

    /**
     * @description Asserts no action taken if fieldId is not "entity"
     * @param {void}
     * @returns {void}
     */
    test('fieldChanged - non-entity field, no action', async () => {
        context.fieldId = 'otherfield'
        await shippingAutoPopulate.fieldChanged(context)
        expect(context.currentRecord.setValue).not.toHaveBeenCalled()
    })

    /**
     * @description Checks short address results in shipping rate of 10
     * @param {void}
     * @returns {void}
     */
    test('fieldChanged - short address => rate=10', async () => {
        const mockRunSuiteQL = require('N/query').runSuiteQL
        mockRunSuiteQL.mockResolvedValue({
            asMappedResults: () => [{ defaultaddress: 'Short' }]
        })
        context.currentRecord.getValue.mockReturnValue('123')
        await shippingAutoPopulate.fieldChanged(context)
        expect(context.currentRecord.setValue)
            .toHaveBeenCalledWith({
                fieldId: 'custbody_shipping_rate',
                value: 10
            })
    })

    /**
     * @description Checks long address results in shipping rate of 15
     * @param {void}
     * @returns {void}
     */
    test('fieldChanged - long address => rate=15', async () => {
        const mockRunSuiteQL = require('N/query').runSuiteQL
        mockRunSuiteQL.mockResolvedValue({
            asMappedResults: () =>
                [{ defaultaddress: 'A very very long address' }]
        })
        context.currentRecord.getValue.mockReturnValue('123')
        await shippingAutoPopulate.fieldChanged(context)
        expect(context.currentRecord.setValue)
            .toHaveBeenCalledWith({
                fieldId: 'custbody_shipping_rate',
                value: 15
            })
    })
})
