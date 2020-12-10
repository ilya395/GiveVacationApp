import React, { useEffect, useState, useContext } from 'react';
import Firebase from '../../context/firebaseContext';

const UserForm = (props) => {

  const { history } = props;
  const { getVacationsRef, getUsersRef, getDepartmentsRef } = useContext(Firebase);
  const [id, setId] = useState(props.match.params.id);
  const [allUsers, setAllUsers] = useState([]);
  const [thisUserId, setThisUserId] = useState(0);
  const [thisUserName, setThisUserName] = useState('');
  const [thisUserSurname, setThisUserSurname] = useState('');
  const [thisUserLogin, setThisUserLogin] = useState('');
  const [thisUserRole, setThisUserRole] = useState('');
  const [allDepartments, setAllDepartments] = useState([]);
  const [thisUserDepartmentId, setThisUserDepartmentId] = useState(0);

  useEffect(() => {
    getUsersRef()
      .once('value')
      .then(response => response.val())
      .then(res => {
          setAllUsers(res);
          return res;
      })
      .then(res => {
        if (id !== 'new-user') {
          const user = res.find(item => +item.id === +id);
          console.log(user, id)
          setThisUserName(user.name);
          setThisUserSurname(user.surname);
          setThisUserLogin(user.login);
          setThisUserRole(user.role);
          setThisUserDepartmentId(user.department_id || null);
        } 
      })
      .catch(e => console.log(e))
      .finally(() => console.log('сходили за юзерами'));
  }, [id]);

  useEffect(() => {
    getDepartmentsRef()
      .once('value')
      .then(response => response.val())
      .then(res => {
        setAllDepartments(res)
        return res;
      })
      .then(res => {
        if (thisUserDepartmentId === 0 || thisUserDepartmentId === null) {
          console.log(res[0].name)
          setThisUserDepartmentId(res[0].id);
        }
      })
      .catch(e => console.log(e))
      .finally(() => console.log('сходили за отделами', allDepartments));
  }, []);

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

  const handleChangeDepartment = (event) => {
    console.log(event.target.value)
    setThisUserDepartmentId(event.target.value);
  }

  const submitForm = (event) => {
    event.preventDefault();

    const findResultIndex = allUsers.findIndex(item => +item.id === +id);
    if (findResultIndex !== -1) { // есть совпадения
      allUsers[+findResultIndex].name = thisUserName;
      allUsers[+findResultIndex].surname = thisUserSurname;
      allUsers[+findResultIndex].login = thisUserLogin;
      allUsers[+findResultIndex].department_id = thisUserDepartmentId;
      // allUsers[+findResultIndex].role = vacationStartValue;
        if (thisUserName !== '' && thisUserSurname !== '' && thisUserLogin !== '' && thisUserDepartmentId !== '') {
            getUsersRef()
                .set(allUsers)
                .then(() => history.push('/users'))
                .catch(e => console.log(e));
        } else {
            alert('Ошибка в данных');
        }
    } else { // нет совпадений
      allUsers.push({
            name: thisUserName,
            surname: thisUserSurname,
            login: thisUserLogin,
            id: new Date().getTime(),
            department_id: thisUserDepartmentId,
        });

        if (thisUserName !== '' && thisUserSurname !== '' && thisUserLogin !== '' && thisUserDepartmentId !== '') {
            getUsersRef()
                .set(allUsers)
                .then(() => history.push('/users'))
                .catch(e => console.log(e));
        } else {
            alert('Ошибка в данных');
        }
    }
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
                  <label htmlFor="departament">Отдел</label>
                  <select
                    id="departament" 
                    name="departament"
                    value={+thisUserDepartmentId}
                    onChange={handleChangeDepartment}
                  >
                    {
                      allDepartments.map(item => (
                        <option key={+item.id} value={+item.id}>{item.name}</option>
                      ))
                    }
                  </select>
              </div>
              {/* <div>
                  <label htmlFor="role">Статус(роль)</label>
                  <input type="text" id="role" name="role" defaultValue={thisUserRole} onChange={handleRole} />
              </div> */}
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