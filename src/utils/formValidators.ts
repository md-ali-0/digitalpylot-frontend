/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/validators.ts
import type { Rule } from "antd/es/form";

const isEmpty = (v: any) =>
  v === undefined ||
  v === null ||
  v === "" ||
  (Array.isArray(v) && v.length === 0);

/**
 * Row-wise conditional required validator
 */
export const conditionalRequired = (
  section: string,
  rowIndex: number,
  fieldKey: string,
  trigger: string = "productId",
): Rule => {
  return {
    validator: async (_: any, value: any, { getFieldValue }: any) => {
      const row = getFieldValue([section, rowIndex]) || {};
      const triggerVal = row[trigger];
      const triggerEmpty = isEmpty(triggerVal);

      if (fieldKey === trigger) {
        const anyOtherFilled = Object.entries(row).some(
          ([k, v]) => k !== trigger && !isEmpty(v),
        );
        if (triggerEmpty && anyOtherFilled) {
          return Promise.reject(new Error("Please select a product first"));
        }
        return Promise.resolve();
      }

      if (triggerEmpty && !isEmpty(value)) {
        return Promise.reject(new Error("Please select a product first"));
      }

      if (!triggerEmpty && isEmpty(value)) {
        return Promise.reject(new Error("This field is required"));
      }

      return Promise.resolve();
    },
  };
};

/**
 * UI এর জন্য conditional required star mark
 */
export const getConditionalRequiredFlag = (
  section: string,
  rowIndex: number,
  trigger: string,
  getFieldValue: (name: any) => any,
) => {
  const row = getFieldValue([section, rowIndex]) || {};
  return !isEmpty(row[trigger]); // যদি product select করা হয় → star mark দেখাবে
};
