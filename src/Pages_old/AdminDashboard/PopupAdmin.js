"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image as ImageIcon,
  Link as LinkIcon,
  Save,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Eye,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export default function PopupAdmin() {
  // 👉 If your API is on another origin, change this base URL
  const API_BASE = "http://localhost:3200";
  const endpoint = `${API_BASE}/api/popup`;

  const [form, setForm] = useState({
    imageUrl: "",
    message: "",
    enabled: false,
  });
  const [loadedData, setLoadedData] = useState({
    imageUrl: "",
    message: "",
    enabled: false,
  });
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("info"); // info | success | error

  const isCreateMode = useMemo(() => {
    const empty =
      !loadedData.imageUrl &&
      !loadedData.message &&
      !loadedData.enabled &&
      !updatedAt;
    return empty;
  }, [loadedData, updatedAt]);

  const isDirty = useMemo(() => {
    return (
      form.imageUrl !== loadedData.imageUrl ||
      form.message !== loadedData.message ||
      Boolean(form.enabled) !== Boolean(loadedData.enabled)
    );
  }, [form, loadedData]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(endpoint);
        const text = await res.text();
        if (!res.ok) throw new Error(`GET ${res.status} ${text}`);
        const data = JSON.parse(text);
        if (!ignore) {
          const next = {
            imageUrl: data.imageUrl || "",
            message: data.message || "",
            enabled: Boolean(data.enabled),
          };
          setForm(next);
          setLoadedData(next);
          setUpdatedAt(data.updatedAt || null);
          setStatus("");
        }
      } catch (err) {
        console.error(err);
        if (!ignore) {
          setStatus(String(err.message || err));
          setStatusType("error");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [endpoint]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetToLoaded = () => {
    setForm(loadedData);
    setStatus("Reverted changes");
    setStatusType("info");
    setTimeout(() => setStatus(""), 2000);
  };

  const save = async (e) => {
    e?.preventDefault?.();
    if (saving) return;

    setSaving(true);
    setStatus("");

    if (!form.imageUrl || !form.message) {
      setStatus("Please provide both Image URL and Message.");
      setStatusType("error");
      setSaving(false);
      return;
    }

    try {
      let res, text;

      if (isCreateMode) {
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.status === 409) {
          res = await fetch(endpoint, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
        }
      } else {
        res = await fetch(endpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      text = await res.text();
      if (!res.ok) throw new Error(`SAVE ${res.status} ${text}`);

      setStatus("Saved successfully");
      setStatusType("success");
      setUpdatedAt(new Date().toISOString());
      setLoadedData(form);
    } catch (err) {
      console.error(err);
      setStatus(String(err.message || err));
      setStatusType("error");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(""), 3500);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/10 via-sky-500/10 to-emerald-500/10" />
        <div className="relative flex items-center gap-3 px-6 py-5">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Popup Settings</h1>
            <p className="text-sm text-gray-500">
              Manage the homepage promo popup content and visibility.
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="rounded-full border px-3 py-1 text-xs text-gray-600">
              {isCreateMode ? "Create mode" : "Update mode"}
            </span>
            {updatedAt && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                Last saved: {new Date(updatedAt).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Form Card */}
        <form
          onSubmit={save}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {isDirty ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-700 ring-1 ring-amber-200">
                  <AlertTriangle className="h-3.5 w-3.5" /> Unsaved changes
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 ring-1 ring-emerald-200">
                  <CheckCircle2 className="h-3.5 w-3.5" /> All changes saved
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetToLoaded}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4" /> Reset
              </button>
              <button
                type="submit"
                disabled={saving || !isDirty}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />{" "}
                    {isCreateMode ? "Create" : "Save"}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Image URL */}
          <label className="mb-1 block text-sm font-medium">Image URL</label>
          <div className="mb-4 flex items-stretch gap-2">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <ImageIcon className="h-4 w-4" />
              </div>
              <input
                className="w-full rounded-lg border px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={onChange}
                placeholder="https://cdn.example.com/promo.jpg"
                required
              />
            </div>
            <a
              href={form.imageUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
            >
              <Eye className="h-4 w-4" /> Preview
            </a>
          </div>
          <p className="-mt-2 mb-4 text-xs text-gray-500">
            Use a square image for best results (e.g., 800×800).
          </p>

          {/* Message */}
          <label className="mb-1 block text-sm font-medium">Message</label>
          <div className="mb-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <LinkIcon className="h-4 w-4 opacity-0" />
              </div>
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
                type="text"
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Grand Opening, Visit Now!"
                required
              />
            </div>
          </div>

          {/* Enabled toggle */}
          <label className="mb-1 block text-sm font-medium">Enabled</label>
          <div className="mb-2">
            <label
              className="inline-flex cursor-pointer items-center gap-3"
              role="switch"
              aria-checked={form.enabled}
            >
              <input
                type="checkbox"
                name="enabled"
                checked={form.enabled}
                onChange={onChange}
                className="peer sr-only"
              />

              {/* Track */}
              <span
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200"
                style={{ backgroundColor: form.enabled ? "#000" : "#D1D5DB" }}
              >
                <span
                  className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${
                    form.enabled ? "translate-x-5" : ""
                  }`}
                />
              </span>

              <span className="text-sm text-gray-700">
                {form.enabled ? "On" : "Off"}
              </span>
            </label>
          </div>

          <p className="text-xs text-gray-500">
            When enabled, the popup may still be constrained by any time-window
            logic on your homepage.
          </p>

          {/* Inline status */}
          {status && (
            <div
              className={
                "mt-4 flex items-start gap-2 rounded-lg border px-3 py-2 text-sm " +
                (statusType === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : statusType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-sky-200 bg-sky-50 text-sky-700")
              }
            >
              {statusType === "error" ? (
                <AlertTriangle className="mt-0.5 h-4 w-4" />
              ) : statusType === "success" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4" />
              ) : (
                <Loader2 className="mt-0.5 h-4 w-4 animate-spin" />
              )}
              <span>{status}</span>
            </div>
          )}
        </form>

        {/* Preview Card */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium">Live Preview</div>
            <span className="rounded-full border px-2.5 py-1 text-xs text-gray-500">
              {isCreateMode ? "Create mode" : "Update mode"}
            </span>
          </div>

          {/* Skeleton while loading */}
          {loading ? (
            <div className="animate-pulse">
              <div className="mb-3 h-64 w-full rounded-xl bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ) : (
            <div>
              <div className="relative overflow-hidden rounded-xl border bg-gray-50">
                {form.imageUrl ? (
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="h-72 w-full object-contain bg-white"
                  />
                ) : (
                  <div className="flex h-72 w-full items-center justify-center text-gray-400">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-base font-semibold text-gray-800">
                  {form.message || "Your popup message will appear here"}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  Enabled: {String(form.enabled)}
                </p>
                {updatedAt && (
                  <p className="mt-1 text-xs text-gray-400">
                    Last saved {new Date(updatedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer hint */}
      {/* <div className="mt-6 text-center text-xs text-gray-400">
        Powered by your custom admin • Ensure CORS + JSON middleware on the API
        • Endpoint: <code className="rounded bg-gray-100 px-1">{endpoint}</code>
      </div> */}
    </div>
  );
}
