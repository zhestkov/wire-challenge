import React from 'react';
import cn from 'classnames';
import styles from './input-field.module.scss';

type TInputFieldProps = {
  value: string;
  placeholder?: string;
  autofocus?: boolean;
  disabled?: boolean;
  type?: string;
  error?: boolean;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export class InputField extends React.Component<TInputFieldProps> {
  private inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: TInputFieldProps) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount(): void {
    if (this.props.autofocus) {
      this.inputRef.current!.focus();
    }
  }

  render() {
    const {
      value,
      error,
      type = 'string',
      placeholder,
      disabled,
      className,
      onChange,
      onBlur
    } = this.props;

    const classNames = cn(styles.control, className)
    return (
      <div className={classNames}>
        <input
          ref={this.inputRef}
          className={cn(
            styles.input,
            { error }
          )}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={ev => onChange(ev.target.value)}
          onBlur={ev => onBlur && onBlur()}
        />
      </div>
    )
  }
}
