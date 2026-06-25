"use client";
import React, { useState, useCallback } from "react";
import styles from "./FormBuilder.module.css";

type FieldType = "text" | "number" | "email" | "tel" | "textarea" | "select";

interface Field {
  id: string;
  label: string;
  type: FieldType;
  placeholder: string;
  required: boolean;
  options: string;
}

let fieldCounter = 1;
function newField(): Field {
  const id = `field_${Date.now()}_${fieldCounter++}`;
  return { id, label: "", type: "text", placeholder: "", required: false, options: "" };
}

const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Select (Dropdown)" },
];

const FormBuilder: React.FC = () => {
  const [formName, setFormName] = useState("My Custom Form");
  const [fields, setFields] = useState<Field[]>([{ ...newField(), label: "Name", placeholder: "Enter your name" }]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const addField = () => setFields((prev) => [...prev, newField()]);

  const removeField = (id: string) => setFields((prev) => prev.filter((f) => f.id !== id));

  const updateField = (id: string, key: keyof Field, value: string | boolean) =>
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)));

  const moveField = (index: number, dir: -1 | 1) => {
    const to = index + dir;
    if (to < 0 || to >= fields.length) return;
    setFields((prev) => {
      const arr = [...prev];
      [arr[index], arr[to]] = [arr[to], arr[index]];
      return arr;
    });
  };

  const handleFormValue = (fieldId: string, value: string) =>
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));

  const resetForm = () => {
    setFormValues({});
    setStatus("idle");
    setErrorMsg("");
  };

  const handleSubmit = useCallback(async () => {
    const missingRequired = fields.filter((f) => f.required && !formValues[f.id]?.trim());
    if (missingRequired.length > 0) {
      setErrorMsg(`Please fill required fields: ${missingRequired.map((f) => f.label).join(", ")}`);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName, fields, formValues }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }, [fields, formValues, formName]);

  const renderFieldInput = (field: Field) => {
    const val = formValues[field.id] || "";
    switch (field.type) {
      case "textarea":
        return (
          <textarea
            className={styles.fieldInput}
            placeholder={field.placeholder}
            value={val}
            onChange={(e) => handleFormValue(field.id, e.target.value)}
            rows={4}
          />
        );
      case "select": {
        const opts = field.options
          .split(/[,;\n]/)
          .map((s) => s.trim())
          .filter(Boolean);
        return (
          <select
            className={styles.fieldInput}
            value={val}
            onChange={(e) => handleFormValue(field.id, e.target.value)}
          >
            <option value="">{field.placeholder || "-- Select --"}</option>
            {opts.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        );
      }
      default:
        return (
          <input
            className={styles.fieldInput}
            type={field.type}
            placeholder={field.placeholder}
            value={val}
            onChange={(e) => handleFormValue(field.id, e.target.value)}
          />
        );
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${!previewMode ? styles.tabActive : ""}`}
              onClick={() => setPreviewMode(false)}
            >
              Build Form
            </button>
            <button
              className={`${styles.tab} ${previewMode ? styles.tabActive : ""}`}
              onClick={() => setPreviewMode(true)}
            >
              Preview & Submit
            </button>
          </div>
          <p className={styles.sub}>
            {previewMode
              ? "Fill and submit the form — data goes directly to Google Sheets"
              : "Add, edit, and reorder form fields below"}
          </p>
        </div>

        {!previewMode ? (
          <div className={styles.builder}>
            <div className={styles.field}>
              <label className={styles.label}>Form Name</label>
              <input
                className={styles.input}
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="My Form"
              />
            </div>

            <div className={styles.fieldsHeader}>
              <span className={styles.fieldsTitle}>Fields ({fields.length})</span>
              <button className={styles.addBtn} onClick={addField}>
                + Add Field
              </button>
            </div>

            <div className={styles.fieldsList}>
              {fields.map((field, i) => (
                <div key={field.id} className={styles.fieldRow}>
                  <div className={styles.fieldRowHeader}>
                    <span className={styles.fieldIndex}>#{i + 1}</span>
                    <div className={styles.moveBtns}>
                      <button
                        className={styles.moveBtn}
                        disabled={i === 0}
                        onClick={() => moveField(i, -1)}
                        title="Move up"
                      >
                        ▲
                      </button>
                      <button
                        className={styles.moveBtn}
                        disabled={i === fields.length - 1}
                        onClick={() => moveField(i, 1)}
                        title="Move down"
                      >
                        ▼
                      </button>
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeField(field.id)} title="Remove field">
                      ✕
                    </button>
                  </div>

                  <div className={styles.fieldGrid}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Label</label>
                      <input
                        className={styles.input}
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(field.id, "label", e.target.value)}
                        placeholder="Field Label"
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Type</label>
                      <select
                        className={styles.select}
                        value={field.type}
                        onChange={(e) => updateField(field.id, "type", e.target.value as FieldType)}
                      >
                        {FIELD_TYPES.map((t) => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Placeholder</label>
                      <input
                        className={styles.input}
                        type="text"
                        value={field.placeholder}
                        onChange={(e) => updateField(field.id, "placeholder", e.target.value)}
                        placeholder="Placeholder text"
                      />
                    </div>

                    <div className={styles.fieldGroupCheck}>
                      <label className={styles.checkLabel}>
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => updateField(field.id, "required", e.target.checked)}
                        />
                        Required
                      </label>
                    </div>
                  </div>

                  {field.type === "select" && (
                    <div className={styles.fieldGroup}>
                      <label className={styles.fieldLabel}>Options (comma or newline separated)</label>
                      <textarea
                        className={styles.input}
                        value={field.options}
                        onChange={(e) => updateField(field.id, "options", e.target.value)}
                        placeholder="Option 1, Option 2, Option 3"
                        rows={2}
                      />
                    </div>
                  )}
                </div>
              ))}

              {fields.length === 0 && (
                <div className={styles.emptyState}>
                  No fields yet. Click "+ Add Field" to start building your form.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.preview}>
            <div className={styles.previewHeader}>
              <h2 className={styles.previewTitle}>{formName || "Untitled Form"}</h2>
              <p className={styles.previewSub}>
                {fields.length} field{fields.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className={styles.previewFields}>
              {fields.map((field) => (
                <div key={field.id} className={styles.previewField}>
                  <label className={styles.previewLabel}>
                    {field.label || "Untitled Field"}
                    {field.required && <span className={styles.requiredStar}>*</span>}
                  </label>
                  {renderFieldInput(field)}
                </div>
              ))}
            </div>

            {fields.length === 0 && (
              <div className={styles.emptyState}>
                No fields to display. Go to "Build Form" tab and add some fields first.
              </div>
            )}

            {fields.length > 0 && (
              <div className={styles.submitArea}>
                {status === "success" ? (
                  <div className={styles.successBox}>
                    <div className={styles.successIcon}>✓</div>
                    <p className={styles.successText}>Form submitted successfully!</p>
                    <button className={styles.resetBtn} onClick={resetForm}>
                      Submit Another Response
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className={`${styles.submitBtn} ${status === "submitting" ? styles.submitting : ""}`}
                      onClick={handleSubmit}
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? "⏳ Submitting..." : "✓ Submit"}
                    </button>
                    {status === "error" && errorMsg && (
                      <p className={styles.errorText}>{errorMsg}</p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
