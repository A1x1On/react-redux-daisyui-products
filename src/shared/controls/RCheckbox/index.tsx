import React, { useId } from 'react'
import clsx, { type ClassValue } from 'clsx'
import styles from './index.module.scss'

interface RCheckboxProps {
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeValue?: (checked: boolean) => void
  id?: string
  className?: ClassValue
  disabled?: boolean
}

const RCheckbox = ({ checked = false, onChange, onChangeValue, id, className, disabled = false }: RCheckboxProps) => {
  const generatedId = useId()
  const inputId = id || generatedId

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeValue?.(e.target.checked)
  }

  return (
    <label className={clsx(styles.rCheckbox, className)}>
      <input
        id={inputId}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <div className={styles.block} />
    </label>
  )
}

export { RCheckbox }
