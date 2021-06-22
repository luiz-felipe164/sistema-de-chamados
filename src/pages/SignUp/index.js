
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signUp} = useContext(AuthContext)

  function handleSubmit(e){
    e.preventDefault();
    if (nome !== '' && email !== '' && password !== '') {
      signUp(nome, email, password)
    } else {
      alert('Todos os campos são obrigatorios!')
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Sistema Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>
          <input type="text" placeholder="Your name" value={nome} onChange={ (e) => setNome(e.target.value) }/>
          <input type="email" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />
          <button type="submit">Acessar</button>
        </form>  

        <Link to="/">Já tem uma conta? Entre!</Link>
      </div>
    </div>
  );
}

export default SignUp;
