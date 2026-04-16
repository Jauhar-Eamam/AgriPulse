import { useState } from "react";
import { login, signup } from "../api/auth";

const translations = {
  english: {
    email: "Email",
    password: "Password",
    login: "Login",
    signup: "Signup",
    toggle: "Hindi",
    emailPlaceholder: "Enter Email",
    passwordPlaceholder: "Enter Password",
    returnText: "Don't have an account?",
    switchText: "Already have an account?",
    emailExists: "Email already exists",
    incorrectPassword: "Incorrect password",
    accountNotFound: "Account not found",
    loginSuccess: "Logged in successfully",
    signupSuccess: "Signed up successfully",
    serverError: "Unable to connect to server",
    loading: "Please wait...",
  },
  hindi: {
    email: "ईमेल",
    password: "पासवर्ड",
    login: "लॉगिन",
    signup: "साइन अप",
    toggle: "English",
    emailPlaceholder: "ईमेल दर्ज करें",
    passwordPlaceholder: "पासवर्ड दर्ज करें",
    returnText: "खाता नहीं है?",
    switchText: "पहले से खाता है?",
    emailExists: "यह ईमेल पहले से मौजूद है",
    incorrectPassword: "गलत पासवर्ड",
    accountNotFound: "खाता नहीं मिला",
    loginSuccess: "लॉगिन सफलतापूर्वक हुआ",
    signupSuccess: "सफलतापूर्वक साइन अप हुआ",
    serverError: "सर्वर से कनेक्ट नहीं हो सका",
    loading: "कृपया प्रतीक्षा करें...",
  },
};

function InputField({ label, name, type, value, placeholder, error, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-200" : "border-slate-300 focus:ring-blue-200"
        }`}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [language, setLanguage] = useState("english");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const t = translations[language];
  const disableSubmit = !formData.email.trim() || !formData.password.trim() || loading;

  const translateMessage = (message) => {
    if (!message) return "";
    const translationsMap = {
      "Email already exists": t.emailExists,
      "Incorrect password": t.incorrectPassword,
      "Account not found": t.accountNotFound,
    };
    return translationsMap[message] || message;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setStatusMessage("");
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "english" ? "hindi" : "english"));
    setErrors({ email: "", password: "" });
    setStatusMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({ email: "", password: "" });
    setStatusMessage("");
    setLoading(true);

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };
      const result = isLogin ? await login(payload) : await signup(payload);
      const fallbackMessage = isLogin ? t.loginSuccess : t.signupSuccess;
      setStatusMessage(translateMessage(result.message || fallbackMessage) || fallbackMessage);
      setFormData({ email: "", password: "" });
    } catch (error) {
      const payload = error.payload || {};
      const translated = translateMessage(payload.message || t.serverError);
      if (payload.field) {
        setErrors((prev) => ({ ...prev, [payload.field]: translated }));
      } else {
        setStatusMessage(translated);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{isLogin ? t.login : t.signup}</h1>
            <p className="mt-2 text-sm text-slate-500">{isLogin ? t.switchText : t.returnText}</p>
          </div>
          <button
            type="button"
            onClick={handleToggleLanguage}
            className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {t.toggle}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label={t.email}
            name="email"
            type="email"
            value={formData.email}
            placeholder={t.emailPlaceholder}
            error={errors.email}
            onChange={handleChange}
          />

          <InputField
            label={t.password}
            name="password"
            type="password"
            value={formData.password}
            placeholder={t.passwordPlaceholder}
            error={errors.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={disableSubmit}
            className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${
              disableSubmit ? "bg-slate-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? t.loading : isLogin ? t.login : t.signup}
          </button>
        </form>

        {statusMessage && (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
            {statusMessage}
          </div>
        )}

        <div className="mt-6 text-center text-sm text-slate-500">
          {isLogin ? t.returnText : t.switchText}
          <button
            type="button"
            onClick={() => setIsLogin((prev) => !prev)}
            className="ml-1 font-semibold text-blue-600 hover:text-blue-700"
          >
            {isLogin ? t.signup : t.login}
          </button>
        </div>
      </div>
    </div>
  );
}