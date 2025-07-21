import { register } from './actions'

export default function RegisterPage() {
    return (
        <div>
            <h1 className="page-title">ユーザー登録</h1>
            <form>
                <input id="name" name="name" type="name" placeholder="名前" required />
                <input id="email" name="email" type="email" placeholder="メールアドレス" required />
                <input id="password" name="password" type="password" placeholder="パスワード" required />
                <button formAction={register}>登録</button>
            </form>
        </div>
    )
}