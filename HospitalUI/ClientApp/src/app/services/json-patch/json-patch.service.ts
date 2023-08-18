import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonPatchService {

  // الدالة التي تقوم بتطبيق تعديلات JSON Patch على الكائن الأصلي
  applyPatch(originalObject: any, updatedObject: any): any[] {
    const patch = this.generateJSONPatch(originalObject, updatedObject);
    // تطبيق التعديلات على الكائن الأصلي
    this.applyJSONPatch(originalObject, patch);

    return patch;
  }
  
    // الدالة التي تحول بين الكائن الأصلي والكائن الجديد إلى تعديلات JSON Patch
    generateJSONPatch(originalObject: any, updatedObject: any): any[] {
      const patchOperations: any[] = [];

      // التحقق من الخصائص التي تم تغييرها وإنشاء عمليات الـ JSON Patch بناءً عليها
      for (const key in updatedObject) {
        if (originalObject[key] !== updatedObject[key]) {
            patchOperations.push({
              op: 'replace',
              path: `/${key}`,
              value: updatedObject[key]
            });
        }
      }

      return [{
        PatientId: originalObject.id,
        patchDocument: [
          ...patchOperations
        ]
        }] as any[];
    }
  
    // دالة خاصة لتطبيق تعديلات JSON Patch على الكائن الأصلي
    private applyJSONPatch(obj: any, patch: any[]): void {
      for (const operation of patch) {
        if (operation.op === 'replace') {
          this.applyReplaceOperation(obj, operation);
        }
      }
      }
  
      // دالة خاصة لمعالجة عملية الاستبدال (replace) في JSON Patch
      private applyReplaceOperation(obj: any, operation: any): void {
      const keys = operation.path.split('/').slice(1); // تجاوز العنصر الأول الفارغ ''
      let currentObj = obj;
  
      for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]];
      }
      currentObj[keys[keys.length - 1]] = operation.value;
    }
}
