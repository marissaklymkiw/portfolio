"use client";

import { useRef, useState } from "react";
import ArrowForward from "./ArrowForward";
import {
  EMPTY_FIELDS,
  MESSAGE_MAX,
  SUBJECT_WORD_LIMIT,
  countWords,
  validateContact,
  validateField,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact";

/**
 * ContactForm — the four-field form on /contact.
 *
 * Fields are Name, Email, a SHORT subject capped at SUBJECT_WORD_LIMIT words,
 * and a long message. The two-tier ask is the point: the short field asks the
 * sender to name the thing in a phrase, which is what makes an inbox scannable,
 * and the long field then gets out of the way so they can say it properly.
 *
 * ONLY THE FIRST THREE ARE REQUIRED. The message is optional and has no minimum
 * length. Name, email, and a subject are already enough to reply to, so someone
 * whose whole point fits in the subject line is not made to pad it out to get
 * past the form.
 *
 * NO PLACEHOLDERS, ANYWHERE. Placeholder text vanishes the moment someone
 * starts typing, which is exactly when they might want to re-read it; it is
 * routinely mistaken for a value already filled in; and it cannot meet contrast
 * without looking like one. Every field's guidance therefore lives in a
 * persistent hint under it, wired to the input through aria-describedby so it
 * is announced rather than merely visible.
 *
 * VALIDATION TIMING. Nothing is marked wrong while a field is being typed in
 * for the first time: a field validates on blur, and from then on it re-checks
 * on every keystroke so a corrected field clears immediately. Validating during
 * the first keystrokes tells someone their address is invalid while they are
 * three characters into typing it, which is true and useless.
 *
 * The rules themselves live in lib/contact.ts, shared verbatim with the route
 * handler. The server is the one that decides; this is the fast feedback.
 *
 * COLOR. The error crimson here is the only place in the system it is allowed
 * (design.md §1): a field someone got wrong. Border AND message, never the
 * border alone, because color is not a message (WCAG 1.4.1).
 */

/* Inputs take `muted` (#6f6b77, 5.19:1), NOT the `line` hairline (1.26:1).
   WCAG 1.4.11 wants 3:1 of a boundary that identifies an interactive
   component, and an input's box IS that boundary. This is the open item
   design.md §3 flagged against inputs, settled here at the first real form.

   Square corners: inputs are containers, and containers are 0 (design.md §5).
   The global :focus-visible ring supplies the 2px rich outline at 2px offset,
   so no per-field focus styling is needed. */
const fieldBase =
  "mt-sm w-full rounded-none bg-paper px-md py-[13px] font-body text-body " +
  "text-ink transition-colors";

const labelBase =
  "font-mono text-label uppercase tracking-label text-ink";

const helpBase = "font-mono text-label uppercase tracking-label text-muted";

type Status = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<ContactErrors>({});
  /* which fields have been left once, and so are allowed to show an error */
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const subjectWords = countWords(fields.subject);
  const messageChars = fields.message.trim().length;

  const setValue = (field: keyof ContactFields, value: string) => {
    setFields((f) => ({ ...f, [field]: value }));
    /* re-check only a field that has already been marked wrong once */
    if (touched[field]) {
      setErrors((e) => ({ ...e, [field]: validateField(field, value) }));
    }
  };

  const onBlur = (field: keyof ContactFields) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, fields[field]) }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const found = validateContact(fields);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });

    const firstBad = (Object.keys(found) as (keyof ContactFields)[])[0];
    if (firstBad) {
      /* Send focus to the first field that failed. Without this, a keyboard or
         screen-reader user gets a form that simply refuses to submit with no
         indication of where the problem is. */
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, company: "" }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: ContactErrors;
      };

      if (!res.ok) {
        setStatus("idle");
        /* The server re-ran the same rules and disagreed: show its verdict on
           the fields rather than a generic failure. */
        if (data.errors) {
          setErrors(data.errors);
          const firstServerBad = (Object.keys(data.errors) as (keyof ContactFields)[])[0];
          if (firstServerBad) {
            formRef.current
              ?.querySelector<HTMLElement>(`[name="${firstServerBad}"]`)
              ?.focus();
          }
          return;
        }
        setFormError(data.error ?? "Something went wrong. Please email me directly.");
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("idle");
      setFormError(
        "The message couldn't be sent. Check your connection, or email me directly.",
      );
    }
  };

  /* ---- Sent ------------------------------------------------------------
     The form is replaced rather than left on screen with a banner over it.
     There is nothing left to do here, and a dead form under a success message
     invites a second send. role="status" announces it; tabIndex -1 plus the
     focus call means keyboard focus lands on the confirmation instead of
     staying on a button that no longer exists. */
  if (status === "sent") {
    return (
      <div
        role="status"
        tabIndex={-1}
        ref={(node) => {
          node?.focus();
        }}
        /* No ink rule of its own. The section rule already sits ABOVE "Send a
           message" (design.md §3: rule on top, title under it); a second one
           here would put a rule UNDER the heading and invert the pattern. */
        className="focus-visible:outline-none"
      >
        <p className={helpBase}>Sent</p>
        <p className="mt-md font-display text-h2 text-ink text-pretty">
          Thanks. It landed.
        </p>
        <p className="mt-md max-w-measure text-body text-ink">
          I read everything that comes through here and usually reply within a
          few days. If it is urgent, email is faster.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  /* Per-field class: crimson border when wrong, muted when not. */
  const borderFor = (field: keyof ContactFields) =>
    errors[field] ? "border border-error" : "border border-muted";

  const describedBy = (field: keyof ContactFields, hintId?: string) =>
    [errors[field] ? `${field}-error` : null, hintId ?? null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      {/* Honeypot. Off-screen rather than display:none, because some bots skip
          fields that are not rendered at all. aria-hidden + tabIndex -1 keep it
          out of the way of anyone using the form for real. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name + Email share a row once there is width for it. They are the two
          shortest fields and the two the sender fills without thinking. */}
      <div className="grid grid-cols-1 min-[620px]:grid-cols-2 gap-lg">
        <div>
          <label htmlFor="name" className={labelBase}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(e) => setValue("name", e.target.value)}
            onBlur={() => onBlur("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={`${fieldBase} ${borderFor("name")}`}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className={labelBase}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(e) => setValue("email", e.target.value)}
            onBlur={() => onBlur("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={`${fieldBase} ${borderFor("email")}`}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      {/* The short one. The counter is the instruction: it is visible before a
          single character is typed, so the cap is a constraint the sender works
          within rather than a rejection they discover at the end. */}
      <div className="mt-lg">
        <div className="flex items-baseline justify-between gap-md">
          <label htmlFor="subject" className={labelBase}>
            What is this about?
          </label>
          {/* aria-hidden: a live counter on every keystroke is noise in a screen
              reader. The same limit is stated in #subject-hint, which IS
              announced, and going over produces a real error message. */}
          <span
            aria-hidden="true"
            className={`font-mono text-label tracking-label ${
              subjectWords > SUBJECT_WORD_LIMIT ? "text-error" : "text-muted"
            }`}
          >
            {subjectWords}/{SUBJECT_WORD_LIMIT}
          </span>
        </div>
        <input
          id="subject"
          name="subject"
          type="text"
          value={fields.subject}
          onChange={(e) => setValue("subject", e.target.value)}
          onBlur={() => onBlur("subject")}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={describedBy("subject", "subject-hint")}
          className={`${fieldBase} ${borderFor("subject")}`}
        />
        <FieldError id="subject-error" message={errors.subject} />
        <p id="subject-hint" className={`mt-sm ${helpBase}`}>
          {SUBJECT_WORD_LIMIT} words or fewer. A role, a project, a question.
        </p>
      </div>

      {/* The long one. Eight rows, which is enough to signal "say as much as you
          need" without pushing the submit button off a phone screen. */}
      <div className="mt-lg">
        <div className="flex items-baseline justify-between gap-md">
          {/* "Optional" is in the visible label, not only in the hint below
              it. Required-ness is information someone needs BEFORE they decide
              whether to fill a field, and the label is where they look. The
              other three carry no marker: when most of a short form is
              required, marking the one exception is quieter and clearer than
              starring everything else. */}
          <label htmlFor="message" className={labelBase}>
            Message <span className="text-muted">(optional)</span>
          </label>
          <span
            aria-hidden="true"
            className={`font-mono text-label tracking-label ${
              messageChars > MESSAGE_MAX ? "text-error" : "text-muted"
            }`}
          >
            {messageChars}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          rows={8}
          value={fields.message}
          onChange={(e) => setValue("message", e.target.value)}
          onBlur={() => onBlur("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", "message-hint")}
          className={`${fieldBase} ${borderFor("message")} resize-y`}
        />
        <FieldError id="message-error" message={errors.message} />
        <p id="message-hint" className={`mt-sm ${helpBase}`}>
          The context, the timeline, what you are hoping for. Up to{" "}
          {MESSAGE_MAX} characters.
        </p>
      </div>

      {/* Whole-form failure: the network dropped, or the server could not send.
          Distinct from a field error, so it sits with the button rather than
          under an input. */}
      {formError && (
        <p
          role="alert"
          className="mt-lg border-l-2 border-error pl-md text-body text-error"
        >
          {formError}
        </p>
      )}

      {/* Primary button, design.md §6: fully round, rich fill, white label,
          hover deepens to true black, 1px nudge on :active. Disabled while in
          flight so a slow connection cannot produce two of the same message. */}
      <div className="mt-xl flex flex-wrap items-center gap-lg">
        <button
          type="submit"
          disabled={sending}
          className={
            "inline-flex items-center gap-2 rounded-button border border-rich px-[26px] py-[13px] " +
            "font-body text-small font-semibold text-paper [transition:transform_.08s,background_.15s] " +
            (sending
              ? "bg-muted border-muted cursor-not-allowed"
              : "bg-rich hover:bg-rich-hover active:translate-y-px cursor-pointer")
          }
        >
          {sending ? "Sending" : "Send"}
          {!sending && <ArrowForward />}
        </button>

        {/* aria-live so the state change is announced; the button's own label
            changes too, but a disabled button is not reliably re-announced. */}
        <span aria-live="polite" className={helpBase}>
          {sending ? "Sending your message" : ""}
        </span>
      </div>
    </form>
  );
}

/**
 * FieldError — the crimson message under a field.
 *
 * role="alert" rather than aria-live, because by the time this renders the
 * person has already left the field and needs to be told now. The arrow glyph
 * is there so the error is not signalled by color alone at a glance either.
 */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-sm text-small text-error">
      <span aria-hidden="true">↳ </span>
      {message}
    </p>
  );
}
