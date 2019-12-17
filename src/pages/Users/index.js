import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';
import { formatCPF, formatPhone } from '../../util/format';

import Table from '../../components/Table';
import translate, { dateLanguage } from '../../locales';

export default function Users() {
  const [users, setUsers] = useState();

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get('/users');

        const usersWithFullname = response.data.map(user => ({
          id: user.id,
          name: `${user.name} ${user.last_name}`,
          email: user.email,
          phone: formatPhone(user.phone),
          birthday: format(parseISO(user.birthday), 'PPP', {
            locale: dateLanguage,
          }),
          cpf: formatCPF(user.cpf),
        }));

        setUsers(usersWithFullname);
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }
    loadUsers();
  }, []);

  const columns = [
    {
      label: translate('user_id_column'),
      field: 'id',
      sort: 'asc',
      width: 150,
    },
    {
      label: translate('user_name_column'),
      field: 'name',
      sort: 'asc',
      width: 270,
    },
    {
      label: translate('user_email_column'),
      field: 'email',
      sort: 'asc',
      width: 200,
    },
    {
      label: translate('user_phone_column'),
      field: 'phone',
      sort: 'asc',
      width: 100,
    },
    {
      label: translate('user_birthday_column'),
      field: 'birthday',
      sort: 'asc',
      width: 150,
    },
    {
      label: translate('user_national_id_column'),
      field: 'cpf',
      sort: 'asc',
      width: 100,
    },
  ];

  const loading = <Animation width={30} height={30} animation={loadingData} />;

  const rows = [
    {
      id: loading,
      name: loading,
      email: loading,
      phone: loading,
      birthday: loading,
      cpf: loading,
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">{translate('users_title')}</h2>
            <div className="panel panel-default">
              <div className="panel-heading">
                {translate('customer_list_header')}
              </div>
              <div className="panel-body">
                <Table rows={users || rows} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
