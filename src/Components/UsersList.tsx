import { useEffect, useState } from 'react'
import axios from 'axios'
import s from './github.module.css'

type SearchUserType = {
	login: string
	id: number
}
type UsersListPropsType = {
	term: string
	selectedUser: SearchUserType | null
	onUserSelect: (user: SearchUserType) => void
}

type SearchResult = {
	items: SearchUserType[]
}

export const UsersList = (props: UsersListPropsType) => {
	// все пользователи
	const [users, setUsers] = useState<SearchUserType[]>([])

	useEffect(() => {
		console.log('SYNC USERS')
		axios
			.get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`)
			.then(res => {
				setUsers(res.data.items)
			})
	}, [props.term]) //запрос людей по поиску
	return (
		<ul>
			{users
				.map(u => <li key={u.id}
					className={props.selectedUser === u ? s.selected : ''}
					onClick={() => {
						props.onUserSelect(u)
					}}>
					{u.login}
				</li>)}
		</ul>
	)
}
