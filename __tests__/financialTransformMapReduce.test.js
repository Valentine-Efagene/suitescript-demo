/**
 * @file financialTransformMapReduce.test.js
 * @description Jest test suite for financialTransformMapReduce.js
 *
 * Parameter(s):
 *   None
 *
 * Additional Info:
 *   - Mocks NetSuite modules
 *   - Covers map/reduce phases
 *   - Seeks ~90% coverage
 * @version 1.0
 */

jest.mock('N/record', () => ({
    create: {
        promise: jest.fn().mockResolvedValue({
            setValue: jest.fn(),
            save: {
                promise: jest.fn().mockResolvedValue('saved')
            }
        })
    }
}))

jest.mock('N/query', () => ({
    runSuiteQL: jest.fn()
}))

jest.mock('N/log', () => ({
    debug: jest.fn()
}))

jest.mock('N/translation', () => ({
    get: jest.fn().mockReturnValue('TOTAL_PROCESSED_TRANSLATION')
}))

const financialTransform = require('../src/FileCabinet/SuiteApps/com.turing.12345/financialTransformMapReduce.js')

describe('financialTransformMapReduce', () => {
    /**
       * @description Ensures getInputData returns an array of data objects
       * @param {void}
       * @returns {void}
       */
    test('getInputData returns array', () => {
        const input = financialTransform.getInputData()
        expect(Array.isArray(input)).toBe(true)
    })

    /**
       * @description Valid data in map phase should be written out
       * @param {void}
       * @returns {void}
       */
    test('map - valid record is written', () => {
        const mockContext = {
            value: JSON.stringify({ transId: 'EXT001', amount: 100.5 }),
            write: jest.fn()
        }
        financialTransform.map(mockContext)
        expect(mockContext.write).toHaveBeenCalled()
    })

    /**
       * @description Invalid data in map phase should be skipped
       * @param {void}
       * @returns {void}
       */
    test('map - invalid record is skipped', () => {
        const mockContext = {
            value: JSON.stringify({ transId: null, amount: 100.5 }),
            write: jest.fn()
        }
        financialTransform.map(mockContext)
        expect(mockContext.write).not.toHaveBeenCalled()
    })

    /**
       * @description Reduce phase should create records for each valid value
       * @param {void}
       * @returns {void}
       */
    test('reduce - creates records for each item', async () => {
        const mockContext = {
            values: [
                JSON.stringify({ transId: 'EXT001', amount: 100.5 }), JSON.stringify({ transId: 'EXT002', amount: 200.0 })
            ]
        }
        await financialTransform.reduce(mockContext)
        expect(require('N/record').create.promise).toHaveBeenCalledTimes(2)
    })

    /**
    *  NEW TESTS.
    */

    /**
       * @description Summarize logs total processed outputs
       * @param {void}
       * @returns {void}
       */
    test('summarize - logs total processed', () => {
        const mockIter = {
            each: jest.fn().mockImplementation((cb) => {
                cb('EXT001', '')
                cb('EXT002', '')
                return true
            })
        }
        const mockSummary = {
            output: {
                iterator: () => mockIter
            }
        }
        financialTransform.summarize(mockSummary)
        expect(require('N/log').debug).toHaveBeenCalled()
    })
})
