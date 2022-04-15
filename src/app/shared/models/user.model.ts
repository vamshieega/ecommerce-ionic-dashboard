export type EntityStatus = 'inactive' | 'active' | 'deleted' | 'suspended' | 'incomplete';
export type UserType = 'owner' | 'employee' | 'support';

export class UserModel {
	private userId: String;
	// userName will contain the User's Name
	private userName: String;
	private password: String;
	// emailId and contact will be used for authentication.
	private email: String;
	private mobile: String;
	private status: EntityStatus;
	private role: String;
	private permissions: any;
	private userType: UserType;


	constructor() {
		this.userId = '';
		this.userName = '';
		this.password = '';
		this.email = '';
		this.mobile = '';
		this.status = 'active';
		this.role = '';
		this.permissions = {};
		this.userType = 'employee';
	}


	public get _userId(): String {
		return this.userId;
	}

	public get _userName(): String {
		return this.userName;
	}

	public get _password(): String {
		return this.password;
	}

	public get _email(): String {
		return this.email;
	}

	public get _mobile(): String {
		return this.mobile;
	}

	public get _status(): EntityStatus {
		return this.status;
	}

	public get _role(): String {
		return this.role;
	}

	public get _permissions(): {} {
		return this.permissions;
	}

	public get _userType(): UserType {
		return this.userType;
	}


	public set _userId(value: String) {
		this.userId = value;
	}

	public set _userName(value: String) {
		this.userName = value;
	}

	public set _password(value: String) {
		this.password = value;
	}

	public set _email(value: String) {
		this.email = value;
	}

	public set _mobile(value: String) {
		this.mobile = value;
	}

	public set _status(value: EntityStatus) {
		this.status = value;
	}

	public set _role(value: String) {
		this.role = value;
	}

	public set _permissions(value: {}) {
		this.permissions = value;
	}

	public set _userType(value: UserType) {
		this.userType = value;
	}

}
