import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, id, error, className = '', ...props }: InputProps) {
    const inputId = id ?? props.name;
    return (
        <div className="flex flex-col gap-1.5">
            {label && <label htmlFor={inputId} className="text-sm font-medium text-slate-300">{label}</label>}
            <input
                id={inputId}
                className={`w-full px-4 py-3 rounded-xl bg-surface/60 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 ${error ? 'border-danger/50 ring-1 ring-danger/30' : ''} ${className}`}
                {...props}
            />
            {error && <span id={`${inputId}-error`} role="alert" className="text-xs text-red-400">{error}</span>}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function Textarea({ label, id, error, className = '', ...props }: TextareaProps) {
    const textareaId = id ?? props.name;
    return (
        <div className="flex flex-col gap-1.5">
            {label && <label htmlFor={textareaId} className="text-sm font-medium text-slate-300">{label}</label>}
            <textarea
                id={textareaId}
                className={`w-full px-4 py-3 rounded-xl bg-surface/60 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none ${error ? 'border-danger/50 ring-1 ring-danger/30' : ''} ${className}`}
                {...props}
            />
            {error && <span id={`${textareaId}-error`} role="alert" className="text-xs text-red-400">{error}</span>}
        </div>
    );
}

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[] | string[];
    placeholder?: string;
}

export function Select({ label, id, error, options, placeholder, className = '', ...props }: SelectProps) {
    const selectId = id ?? props.name;
    return (
        <div className="flex flex-col gap-1.5">
            {label && <label htmlFor={selectId} className="text-sm font-medium text-slate-300">{label}</label>}
            <div className="relative">
                <select
                    id={selectId}
                    className={`w-full px-4 py-3 rounded-xl bg-surface/60 border border-card-border text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 ${error ? 'border-danger/50 ring-1 ring-danger/30' : ''} ${className}`}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled className="bg-surface text-muted">
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt) => {
                        const val = typeof opt === 'string' ? opt : opt.value;
                        const lab = typeof opt === 'string' ? opt : opt.label;
                        return (
                            <option key={val} value={val} className="bg-surface text-foreground py-2">
                                {lab}
                            </option>
                        );
                    })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div>
            {error && <span id={`${selectId}-error`} role="alert" className="text-xs text-red-400">{error}</span>}
        </div>
    );
}
