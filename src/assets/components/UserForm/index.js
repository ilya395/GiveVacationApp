import React, { useEffect, useState, useContext } from 'react';
import Firebase from '../../context/firebaseContext';

const UserForm = (props) => {

  const { history } = props;
  const { getVacationsRef, getUsersRef } = useContext(Firebase);
  const [id, setId] = useState(props.match.params.id);
  const [allUsers, setAllUsers] = useState([]);
  const [thisUserId, setThisUserId] = useState(0);
  const [thisUserName, setThisUserName] = useState('');
  const [thisUserSurname, setThisUserSurname] = useState('');
  const [thisUserLogin, setThisUserLogin] = useState('');
  const [thisUserRole, setThisUserRole] = useState('');


  useEffect(async () => {
    await getUsersRef()
      .once('value')
      .then(response => response.val())
      .then(res => {
          setAllUsers(res);
          return res;
      })
      .then(res => {
        if (id !== 'new-user') {

          const user = res.find(item => +item.id === +id);

          setThisUserName(user.name);
          setThisUserSurname(user.surname);
          setThisUserLogin(user.login);
          setThisUserRole(user.role);
        }
      })
      .catch(e => console.log(e))
      .finally(() => console.log('сходили за юзерами'));
  }, [id]);

  const handleName = (event) => {
    setThisUserName(event.target.value);
  }

  const handleSurname = (event) => {
    setThisUserSurname(event.target.value);
  }

  const handleLogin = (event) => {
    setThisUserLogin(event.target.value);
  }

  const handleRole = (event) => {
    setThisUserRole(event.target.value);
  }

  const submitForm = (event) => {
    event.preventDefault();
  }

    return (
      <>
        <h2>user form</h2>
        <div>
          <form onSubmit={submitForm}>
              <div>
                  <label htmlFor="name">Имя</label>
                  <input type="text" id="name" name="name" defaultValue={thisUserName} onChange={handleName} />
              </div>
              <div>
                  <label htmlFor="surname">Фамилия</label>
                  <input type="text" id="surname" name="surname" defaultValue={thisUserSurname} onChange={handleSurname} />
              </div>
              <div>
                  <label htmlFor="login">Логин</label>
                  <input type="text" id="login" name="login" defaultValue={thisUserLogin} onChange={handleLogin} />
              </div>
              <div>
                  <label htmlFor="role">Статус(роль)</label>
                  <input type="text" id="role" name="role" defaultValue={thisUserRole} onChange={handleRole} />
              </div>
              <div>
                  <button>
                      Отправить
                  </button>
              </div>
          </form>
        </div>
      </>
    );
}

export default UserForm;