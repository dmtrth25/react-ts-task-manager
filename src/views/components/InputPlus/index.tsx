import React, { FC, useCallback, useState } from 'react'

import styles from './index.module.scss'

interface InputPlusProps {
	onAdd: (title: string) => void
}

export const InputPlus: FC<InputPlusProps> = ({ onAdd }) => {
	const [inputValue, setInputValue] = useState('')
	const addTask = useCallback(() => {
		onAdd(inputValue)
		setInputValue('')
	}, [inputValue])
	return (
		<>
			<div className={styles.inputPlus}>
				<input
					type="text"
					className={styles.inputPlusValue}
					value={inputValue}
					placeholder="Type task..."
					onChange={(event) => {
						setInputValue(event.target.value)
					}}
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							addTask()
						}
					}}
				/>
				<button
					onClick={addTask}
					aria-label="Add"
					className={styles.inputPlusButton}
				/>
			</div>
			<div className={styles.line}></div>
		</>
	)
}
