interface UserSignUp {
	id: string;
	email: string;
	displayName: string;
}

interface UserState {
	id: string;
	email: string;
	displayName: string;
	isLoggedIn: boolean;
	isSeller: boolean;
}
