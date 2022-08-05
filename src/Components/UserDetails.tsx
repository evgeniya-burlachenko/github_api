import { useEffect, useState } from 'react'
import axios from 'axios'
import gitImg from './assets/img/git.svg'

type SearchUserType = {
	login: string
	id: number
}
type UserType = {
	login: string
	id: number
	avatar_url: string
	followers: number
}
type UserDetailsPropsType = {
	user: SearchUserType | null
}

export const UserDetails = (props: UserDetailsPropsType) => {
	//выбранный пользователь для деталей
	const [userDetails, setUserDetails] = useState<null | UserType>(null)

	useEffect(() => {
		console.log('SYNC USER DETAILS')
		if (!!props.user) {
			axios
				.get<UserType>(`https://api.github.com/users/${props.user.login}`)
				.then(res => {
					setUserDetails(res.data)
				})
		}
	}, [props.user]) //показать детали выбранного пользователя зависит от выбранного пользователя
	return (
		<>	
			<img src={gitImg} alt="gitImg" width="40" />
				{userDetails && <div>
					<h2>{userDetails.login}
				</h2>
					<img src={userDetails.avatar_url} />
					<br />
					{userDetails.login},
					followers: {userDetails.followers}
				</div>}
		</>
	)
}
