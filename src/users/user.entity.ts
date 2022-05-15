import { compare, hash } from 'bcryptjs';

export class User {
	private _passwordHash: string;

	constructor(private readonly _email: string, private readonly _name: string, password?: string) {
		if (password) {
			this._passwordHash = password;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._passwordHash;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._passwordHash = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._passwordHash);
	}
}
