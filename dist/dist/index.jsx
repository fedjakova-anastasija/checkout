import React from 'react';

export const AlertType = {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Info: 'info',
  Accent: 'accent',
};

export const BadgeVariants = {
  Accent: 'accent',
  AccentLight: 'accent-light',
  Default: 'default',
  Success: 'success',
  Warning: 'warning',
};

export const BadgeSizes = {
  L: 'l',
  M: 'm',
  S: 's',
  Xs: 'xs',
};

export const CheckboxColors = {
  Error: 'error',
  Warning: 'warning',
};

export const TextFieldValidationStatus = {
  Invalid: 'invalid',
  Valid: 'valid',
  Warning: 'warning',
};

export const buttonVariantEnum = {
  accent: 'accent',
  clear: 'clear',
  primary: 'primary',
  secondary: 'secondary',
};

export const buttonWidthEnum = {
  full: 'full',
};

function joinClasses(...items) {
  return items.filter(Boolean).join(' ');
}

export const Alert = React.forwardRef(function Alert({ children, className, type }, ref) {
  return (
    <div className={joinClasses('kit-alert', `kit-alert-${type}`, className)} ref={ref}>
      {children}
    </div>
  );
});

export function Badge({ children, className, onClick, size = BadgeSizes.M, variant = BadgeVariants.Default }) {
  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag className={joinClasses('kit-badge', `kit-badge-${variant}`, `kit-badge-${size}`, className)} onClick={onClick} type={onClick ? 'button' : undefined}>
      {children}
    </Tag>
  );
}

export function Button({ children, className, disabled, onClick, variant = buttonVariantEnum.primary, width }) {
  return (
    <button
      className={joinClasses('kit-button', `kit-button-${variant}`, width === buttonWidthEnum.full && 'kit-button-full', className)}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function Checkbox({ checked, color, label, onChange }) {
  return (
    <label className={joinClasses('kit-checkbox', color && `kit-checkbox-${color}`)}>
      <input checked={checked} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      <span>{label}</span>
    </label>
  );
}

export function Chip({ label, selected }) {
  return <div className={joinClasses('kit-chip', selected && 'kit-chip-selected')}>{label}</div>;
}

export function HelperText({ opened, text }) {
  if (!opened || !text) return null;
  return <p className="kit-helper-text">{text}</p>;
}

export const Link = React.forwardRef(function Link({ children, className, href = '#', onClick, underlined }, ref) {
  return (
    <a className={joinClasses('kit-link', underlined && 'kit-link-underlined', className)} href={href} onClick={onClick} ref={ref}>
      {children}
    </a>
  );
});

export function RadioCardGroup({ items, name, onChange, value }) {
  return (
    <div className="kit-radio-group">
      {items.map((item) => {
        const selected = item.value === value;

        return (
          <label className={joinClasses('kit-radio-card', selected && 'kit-radio-card-selected')} key={item.value}>
            <input checked={selected} name={name} onChange={() => onChange?.(item.value)} type="radio" />
            <div className="kit-radio-card-main">
              <div className="kit-radio-card-head">
                <strong>{item.title}</strong>
                {item.corner}
              </div>
              {item.linkText ? (
                <button className="kit-link-button" onClick={(event) => {
                  event.preventDefault();
                  item.onLinkClick?.();
                }} type="button">
                  {item.linkText}
                </button>
              ) : null}
            </div>
          </label>
        );
      })}
    </div>
  );
}

export function SegmentedButtons({ items, name, onChangeAction, value }) {
  return (
    <div className="kit-segmented">
      {items.map((item) => (
        <label className={joinClasses('kit-segmented-item', item.value === value && 'kit-segmented-item-selected')} key={item.id}>
          <input checked={item.value === value} name={name} onChange={() => onChangeAction(item.value)} type="radio" />
          <span>{item.label}</span>
        </label>
      ))}
    </div>
  );
}

export const TextField = React.forwardRef(function TextField(
  { className, onChange, placeholder, status, submitted, type = 'text', value, ...props },
  ref,
) {
  return (
    <input
      {...props}
      className={joinClasses('kit-text-field', submitted && status === TextFieldValidationStatus.Invalid && 'kit-text-field-invalid', className)}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
      type={type}
      value={value}
    />
  );
});
