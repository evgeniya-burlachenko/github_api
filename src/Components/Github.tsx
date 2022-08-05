import s from './github.module.css'
import { useEffect, useState } from 'react'
import { Search } from './Search'
import { UsersList } from './UsersList'
import { UserDetails } from './UserDetails'

type SearchUserType = {
	login: string
	id: number
}

export const Github = () => {
	const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
	let initialSearchState = 'evgeniya'
	const [searchTerm, setSearchTerm] = useState(initialSearchState) //
	//-----------------------useEffect-----------------------------
	//если не указать зависимость([]) запустится только 1 раз, а если совсем убрать то будет рендериться после каждой отрисовки
	useEffect(() => {
		console.log('SYNC TAB TITLE')
		if (selectedUser) {
			document.title = selectedUser.login
		}
	}, [selectedUser]) //синхронизация title - зависсимость от выбранного пользователя
	return (
		<>
			{/* 1. SEARCH */}
			<Search value={searchTerm} onClick={(value: string) => { setSearchTerm(value) }} />
			<button className={s.btn1}
				onClick={() => setSearchTerm(initialSearchState)}>Сбросить поиск</button>
			<div className={s.container}>
				{/* 2. USERLIST */}
				<div>
					<UsersList term={searchTerm}
						selectedUser={selectedUser}
						onUserSelect={setSelectedUser} />
				</div>
				{/* 3. USERDETAILS */}
				<div>
					<UserDetails user={selectedUser} />
				</div>
			</div>
		</>
	)
}
