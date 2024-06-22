import { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type FormProps = {
	title: string;
	getDataForm: (email: string, password: string, nickname?: string) => void;
	firebaseError: string;
};

type Inputs = {
	email: string;
	password: string;
	nickname?: string;
};

const UserAuthForm: FC<FormProps> = ({ title, getDataForm, firebaseError }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Inputs>({
		mode: "onSubmit",
	});

	const onSubmit: SubmitHandler<FieldValues> = ({
		email,
		password,
		nickname,
	}) => {
		getDataForm(email, password, nickname);
		reset();
	};

	const userEmail = {
		required: "필수 필드입니다.",
	};

	const userPassword = {
		required: "필수 필드입니다.",
	};

	const userName = {
		required: "필수 필드입니다.",
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<input
					type="email"
					placeholder="E-mail"
					{...register("email", userEmail)}
				/>
				{errors?.email && (
					<div>
						<span>{errors.email.message}</span>
					</div>
				)}
			</div>

			<div>
				<input
					type="password"
					placeholder="Password"
					{...register("password", userPassword)}
				/>
				{errors?.password && (
					<div>
						<span>{errors.password.message}</span>
					</div>
				)}
			</div>

			{title == "회원가입" && (
				<div>
					<input
						type="text"
						placeholder="Nickname"
						{...register("nickname", userName)}
					/>
					{errors?.nickname && (
						<div>
							<span>{errors.nickname.message}</span>
						</div>
					)}
				</div>
			)}
			<button type="submit">{title}</button>
			{firebaseError && <p>{firebaseError}</p>}
		</form>
	);
};

export default UserAuthForm;
