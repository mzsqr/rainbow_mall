import { PlusOutlined } from '@ant-design/icons';
import {Button, message, Drawer} from 'antd';
import React, { useState, useRef } from 'react';
//@ts-ignore
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import { addRule } from '@/services/ant-design-pro/api';
import UpdateForm from "@/pages/userManage/component/UpdateForm";
import UploadForm from './component/UploadForm';
import {fetchSeller, rmUser} from "@/services/UserController";

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};



const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Domain.User>();
  const [selectedRowsState, setSelectedRows] = useState<Domain.User[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<Domain.User>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.user.account"
          defaultMessage="Account"
        />
      ),
      dataIndex: 'account',
      hideInSearch: true,
      hideInTable: true,
      hideInSetting: true
    },
    {
      title: (
        <FormattedMessage
          id="pages.user.nickname"
          defaultMessage="nickname"
        />
      ),
      dataIndex: 'nickname',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.user.phone"
                               defaultMessage="Phone" />,
      dataIndex: 'phone',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.user.email"
          defaultMessage="Email"
        />
      ),
      dataIndex: 'email',
    },
    {
      title: (
        <FormattedMessage
          id="pages.user.regDate"
          defaultMessage="regDate"
        />
      ),
      dataIndex: 'regDate',
      valueType: 'date'
    },
    {
      title: <FormattedMessage id="pages.user.role" defaultMessage="Role" />,
      dataIndex: 'role',
      hideInForm: true,
      valueEnum: {
        1: {
          text: (
            <FormattedMessage
              id="pages.user.role.seller"
              defaultMessage="Seller"
            />
          ),
          status: 'Processing',
        },
        2: {
          text: (
            <FormattedMessage id="pages.user.role.admin"
                              defaultMessage="Admin" />
          ),
          status: 'Success',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <UpdateForm
          trigger={
            <a
            key="update"
            onClick={() => {
              setCurrentRow(record);
            }}
          >
            <FormattedMessage id="pages.searchTable.update" defaultMessage="Update" />
          </a>
          }
          user={record}
          title="更新用户"
        >
        </UpdateForm>
        ,
        <a key="delete" onClick={async ()=>{
          const hide = message.loading("删除中");
          await rmUser(record.account);
          hide();
          message.success("成功");
        }}>
          <FormattedMessage
            id="pages.searchTable.delete"
            defaultMessage="Delete"
          />
        </a>,
      ],
    },
  ];

  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<Domain.Goods, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <UploadForm
            trigger={
              <Button
                type="primary"
                key="primary"
              >
                <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
              </Button>
            }
            title={"新增用户"}
            />
          ,
        ]}
        //@ts-ignore
        request={fetchSeller}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {/*{selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}*/}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              // await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.nickname && (
          <ProDescriptions<Domain.Goods>
            column={2}
            title={currentRow?.nickname}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.account,
            }}
            columns={columns as ProDescriptionsItemProps<Domain.User>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
