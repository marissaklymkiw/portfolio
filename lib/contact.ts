/**
 * Contact form contract — the ONE place the field rules live.
 *
 * Imported by both the client form (components/ui/ContactForm.tsx) and the
 * route handler (app/api/contact/route.ts) so the two can never disagree.
 * Client-side validation is a convenience for the person typing; the server
 * re-runs the exact same functions, because anything posting to /api/contact
 * can skip the form entirely.
 */

/* The subject line is capped in WORDS, not characters, because the cap is a
   writing instruction ("say what this is about in one phrase") rather than a
   storage limit. Words are what the person is actually counting. */
export const SUBJECT_WORD_LIMIT = 12;

export const NAME_MAX = 80;
export const EMAIL_MAX = 254; /* RFC 5321 max path length */
export const MESSAGE_MAX = 2000;

/* The long message is OPTIONAL. Name, email, and the capped subject are the
   required three, and between them they already say who this is and what it is
   about, which is everything needed to reply. Someone who can say it in the
   subject line should not be made to pad it out to get past the form. There is
   no minimum length either: if they do write, any amount is fine. */

export type ContactFields = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const EMPTY_FIELDS: ContactFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/** Words = whitespace-separated runs. Empty string is zero, not one. */
export function countWords(value: string): number {
  const trimmed = value.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

/* Deliberately permissive. Email validation by regex is a known trap: the only
   real proof an address works is mail arriving at it. This rejects the obvious
   typos (no @, no dot in the domain, stray spaces) and gets out of the way. */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/**
 * Validates one field. Returns the message to show, or undefined if it passes.
 * Per-field rather than whole-form so the client can check a single input on
 * blur without lighting up every other field the person hasn't reached yet.
 */
export function validateField(
  field: keyof ContactFields,
  value: string,
): string | undefined {
  const v = value.trim();

  switch (field) {
    case "name":
      if (v === "") return "Enter your name.";
      if (v.length > NAME_MAX) return `Keep this under ${NAME_MAX} characters.`;
      return undefined;

    case "email":
      if (v === "") return "Enter an email address so I can reply.";
      if (v.length > EMAIL_MAX) return "That address is too long.";
      if (!EMAIL_RE.test(v)) return "That doesn't look like an email address.";
      return undefined;

    case "subject": {
      if (v === "") return "Say what this is about.";
      const words = countWords(v);
      if (words > SUBJECT_WORD_LIMIT)
        return `${words} words. Keep it to ${SUBJECT_WORD_LIMIT} or fewer.`;
      return undefined;
    }

    case "message":
      /* Optional: empty is valid. Only the ceiling is enforced. */
      if (v.length > MESSAGE_MAX)
        return `${v.length} characters. The limit is ${MESSAGE_MAX}.`;
      return undefined;
  }
}

/** Runs every field. An empty object means the submission is good. */
export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(fields) as (keyof ContactFields)[]).forEach((field) => {
    const error = validateField(field, fields[field]);
    if (error) errors[field] = error;
  });
  return errors;
}
