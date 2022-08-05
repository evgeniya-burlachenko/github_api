import s from './github.module.css'
import React, { useEffect, useState } from 'react'


type SearchPropsType = {
	value: string
	onClick: (fixedvalue: string) => void
}

export const Search = (props: SearchPropsType) => {
	//input
	const [tempSearch, setTempSearch] = useState('') //для сохранения промежуточного input

	useEffect(() => {
		setTempSearch(props.value)
	}, [props.value])

	return (
		<div>
			<input type="text"
				placeholder='Введи ник пользователя Github'
				value={tempSearch}
				onChange={(e) => {
					setTempSearch(e.currentTarget.value)
				}} />
			<button onClick={() => {
				props.onClick(tempSearch) //в SetSearchTerm промежуточный tempSearch и вывожу
			}}
				className={s.btn1}>Найти
			</button>
		</div>
	)
}