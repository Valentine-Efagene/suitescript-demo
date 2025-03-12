/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/file'], file => {
   /**
    * Function to be executed after page is initialized.
    * @param {object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    *  - The mode in which the record is being accessed (create, copy, or edit)
    * @param {string} scriptContext.mode
    * @since 2015.2
    */
   function pageInit(scriptContext) { }

   /**
    * Function to be executed when field is changed.
    * @param {object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId - Sublist name
    * @param {string} scriptContext.fieldId - Field name
    *  - Line number. Will be undefined if not a matrix field
    * @param {number} scriptContext.lineNum
    * @param {number} scriptContext.columnNum - Column number
    * @since 2015.2
    */
   function fieldChanged(scriptContext) { }

   /**
    * Function to be executed when field is slaved.
    * @param {object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId - Sublist name
    * @param {string} scriptContext.fieldId - Field name
    * @since 2015.2
    */
   function postSourcing(scriptContext) { }

   /**
    * Function to be executed after sublist is inserted, removed, or edited.
    * @param {object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId - Sublist name
    * @since 2015.2
    */
   function sublistChanged(scriptContext) { }

   /**
    * Function to be executed after line is selected.
    * @param {object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId - Sublist name
    * @since 2015.2
    */
   function lineInit(scriptContext) { }

   /**
    * Validation function to be executed when field is changed.
    * @param {object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId - Sublist name
    * @param {string} scriptContext.fieldId - Field name
    *  - Line number. Will be undefined if not a matrix field
    * @param {number} scriptContext.lineNum
    * @param {number} scriptContext.columnNum - Column number
    * @returns {boolean} Return true if field is valid
    * @since 2015.2
    */
   function validateField(scriptContext) { }

   /**
    * Validation function to be executed when sublist line is committed.
    * @param {object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId - Sublist name
    * @returns {boolean} Return true if sublist line is valid
    * @since 2015.2
    */
   function validateLine(scriptContext) { }

   /**
    * Validation function to be executed when sublist line is inserted.
    * @param {object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId - Sublist name
    * @returns {boolean} Return true if sublist line is valid
    * @since 2015.2
    */
   function validateInsert(scriptContext) { }

   /**
    * Validation function to be executed when record is deleted.
    * @param {object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @param {string} scriptContext.sublistId - Sublist name
    * @returns {boolean} Return true if sublist line is valid
    * @since 2015.2
    */
   function validateDelete(scriptContext) { }

   /**
    * Validation function to be executed when record is saved.
    * @param {object} scriptContext
    * @param {Record} scriptContext.currentRecord - Current form record
    * @returns {boolean} Return true if record is valid
    * @since 2015.2
    */
   function saveRecord(scriptContext) { }

   return {
      pageInit: pageInit,
      fieldChanged: fieldChanged,
      postSourcing: postSourcing,
      sublistChanged: sublistChanged,
      lineInit: lineInit,
      validateField: validateField,
      validateLine: validateLine,
      validateInsert: validateInsert,
      validateDelete: validateDelete,
      saveRecord: saveRecord
   }
})
