import React, { useEffect, useState, useContext } from 'react';
import Firebase from '../../context/firebaseContext';

import cn from 'classnames';
import s from './UserForm.module.scss'; 
import SelectList from '../SelectList';

const UserForm = (props) => {

  const { history } = props;
  const { getRolesRef, getUsersRef, getDepartmentsRef } = useContext(Firebase);
  const [id, setId] = useState(props.match.params.id);
  const [allUsers, setAllUsers] = useState([]);
  const [thisUserId, setThisUserId] = useState(0);
  const [thisUserName, setThisUserName] = useState('');
  const [thisUserSurname, setThisUserSurname] = useState('');
  const [thisUserLogin, setThisUserLogin] = useState('');
  const [allUsersRole, setAllUsersRole] = useState([]);
  const [thisUserRoleId, setThisUserRoleId] = useState(0);
  const [allDepartments, setAllDepartments] = useState([]);
  const [thisUserDepartmentId, setThisUserDepartmentId] = useState(0);

  useEffect(() => {
    getRolesRef()
      .once('value')
      .then(response => response.val())
      .then(res => setAllUsersRole(res))
      .catch(e => console.log(e))
      .finally(() => console.log('сходили за юзерами'));
  }, []);
  useEffect(() => {
    if (id && allUsers.length > 0 && allUsersRole.length > 0) {
      if (id === 'new-user') {
        const minRole = allUsersRole.find(item => +item.id === 900); // на самом деле здесь нужно найти минимальное значение поля права
        setThisUserRoleId(+minRole.id);
      } else {
        const user = allUsers.find(item => +item.id === +id);
        if (typeof user.role_id !== 'undefined') {
          setThisUserRoleId(+user.role_id);
        } else {
          const minRole = allUsersRole.find(item => +item.id === 900); // на самом деле здесь нужно найти минимальное значение поля права
          setThisUserRoleId(+minRole.id);
        }
      }
    }
  }, [allUsers, allUsersRole]);
  useEffect(() => {
    getUsersRef()
      .once('value')
      .then(response => response.val())
      .then(res => {
          setAllUsers(res);
          return res;
      })
      // .then(res => {
      //   if (id !== 'new-user') {
      //     const user = res.find(item => +item.id === +id);
      //     console.log(user, id)
      //     setThisUserName(user.name);
      //     setThisUserSurname(user.surname);
      //     setThisUserLogin(user.login);
      //     setThisUserRoleId(user.role_id);
      //     setThisUserDepartmentId(+user.department_id);
      //   } 
      // })
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
      // .then(res => {
      //   if (thisUserDepartmentId === 0 || thisUserDepartmentId === null) {
      //     console.log(res[0].name)
      //     setThisUserDepartmentId(res[0].id);
      //   }
      // })
      .catch(e => console.log(e))
      .finally(() => console.log('сходили за отделами'));
  }, []);
  useEffect(() => {
    if (id !== 'new-user' && allUsers.length > 0) {
      const user = allUsers.find(item => +item.id === +id);
      setThisUserName(user.name);
      setThisUserSurname(user.surname);
      setThisUserLogin(user.login);
      setThisUserDepartmentId(+user.department_id);
    }
    if (id === 'new-user' && allDepartments.length > 0) {
      setThisUserDepartmentId(+allDepartments[0].id);
    }
  }, [id, allDepartments, allUsers]);

  const handleName = (event) => {
    setThisUserName(event.target.value);
  }

  const handleSurname = (event) => {
    setThisUserSurname(event.target.value);
  }

  const handleLogin = (event) => {
    setThisUserLogin(event.target.value);
  }

  const handleChangeDepartment = (event) => {
    setThisUserDepartmentId(event.target.value);
  }

  const handleChooseRole = (id) => {
    setThisUserRoleId(+id);
  }

  const submitForm = (event) => {
    event.preventDefault();

    const findResultIndex = allUsers.findIndex(item => +item.id === +id);
    if (findResultIndex !== -1) { // есть совпадения
      allUsers[+findResultIndex].name = thisUserName;
      allUsers[+findResultIndex].surname = thisUserSurname;
      allUsers[+findResultIndex].login = thisUserLogin;
      allUsers[+findResultIndex].department_id = thisUserDepartmentId;
      allUsers[+findResultIndex].role_id = thisUserRoleId;
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
          role_id: thisUserRoleId,
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
        <h2 className={cn(s['page-title'])}>{id === 'new-user' ? 'Новый пользователь' : 'Редактировать пользователя'}</h2>
        <div>
          <form 
            onSubmit={submitForm}
            className={cn(s.form)}
          >
              <div
                className={cn(s['form-field'], s['form-field__select-wrap'])}
              >
                  <label 
                    htmlFor="name"
                    className={cn(s['select-label'])}
                  >
                    Имя:
                  </label>
                  <input type="text" id="name" name="name" defaultValue={thisUserName} onChange={handleName} className={cn(s['input-elem'])} />
              </div>
              <div className={cn(s['form-field'], s['form-field__select-wrap'])}>
                  <label htmlFor="surname" className={cn(s['select-label'])}>Фамилия:</label>
                  <input type="text" id="surname" name="surname" defaultValue={thisUserSurname} onChange={handleSurname} className={cn(s['input-elem'])} />
              </div>
              <div className={cn(s['form-field'], s['form-field__select-wrap'])}>
                  <label htmlFor="login" className={cn(s['select-label'])}>Логин:</label>
                  <input type="text" id="login" name="login" defaultValue={thisUserLogin} onChange={handleLogin} className={cn(s['input-elem'])} />
              </div>
              <div className={cn(s['form-field'], s['form-field__select-wrap'])}>
                  <label htmlFor="departament" className={cn(s['select-label'])}>Отдел:</label>
                  <select
                    id="departament" 
                    name="departament"
                    value={+thisUserDepartmentId}
                    onChange={handleChangeDepartment}
                    className={cn(s['select-element'])}
                  >
                    {
                      allDepartments.map(item => (
                        <option key={+item.id} value={+item.id}>{item.name}</option>
                      ))
                    }
                  </select>
              </div>
              <div className={cn(s['form-field'], s['form-field__select-wrap'])}>
                  <label htmlFor="roles" className={cn(s['select-label'])}>Набор прав:</label>
                <SelectList
                  identificate={'roles'}
                  title={'Выберите набор прав'}
                  defaultValue={+thisUserRoleId} 
                  handleFunction={handleChooseRole} 
                  data={allUsersRole}
                  className={cn(s['select-component'])}
                />
              </div>
              <div className={cn(s['form-field'])}>
                  <button className={cn(s['submit-button'])}>
                      Отправить
                  </button>
              </div>
          </form>
        </div>
      </>
    );
}

export default UserForm;