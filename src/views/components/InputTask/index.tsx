import React, { FC, useEffect } from 'react'

import styles from './index.module.scss'

interface InputTaskProps {
	id: string
	title: string
	onDone: (id: string) => void
	onEdited: (id: string, title: string) => void
	onRemoved: (id: string) => void
}

export const InputTask: FC<InputTaskProps> = ({
	id,
	title,
	onDone,
	onEdited,
	onRemoved,
}) => {
	const [checked, setChecked] = React.useState(false)
	const [isEdit, setIsEdit] = React.useState(false)
	const [value, setValue] = React.useState(title)
	const editTitleInputRef = React.useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isEdit) {
			editTitleInputRef?.current?.focus()
		}
	}, [isEdit])

	return (
		<>
			<div className={styles.InputTask}>
				<label className={styles.InputTaskLabel}>
					<input
						type="checkbox"
						disabled={isEdit}
						checked={checked}
						className={styles.InputTaskCheckbox}
						onChange={(evt) => {
							setChecked(evt.target.checked)

							if (evt.target.checked) {
								setTimeout(() => {
									onDone(id)
								}, 300)
							}
						}}
					/>
					{isEdit ? (
						<input
							value={value}
							onChange={(evt) => {
								setValue(evt.target.value)
							}}
							ref={editTitleInputRef}
							onKeyDown={(evt) => {
								if (evt.key == 'Enter') {
									onEdited(id, value)
									setIsEdit(false)
								}
							}}
							className={styles.InputTaskTitleEdit}
						/>
					) : (
						<h3 className={styles.InputTaskTitle}>{title}</h3>
					)}
				</label>
				{isEdit ? (
					<button
						aria-label="Save"
						className={styles.InputTaskSave}
						onClick={() => {
							onEdited(id, value)
							setIsEdit(false)
						}}
					/>
				) : (
					<button
						className={styles.InputTaskEdit}
						aria-label="Edit"
						onClick={() => {
							setIsEdit(true)
						}}
					/>
				)}
				<button
					className={styles.InputTaskRemove}
					aria-label="Remove"
					onClick={() => {
						if (confirm('Are you sure?')) {
							onRemoved(id)
						}
					}}
				/>
			</div>
		</>
	)
}
