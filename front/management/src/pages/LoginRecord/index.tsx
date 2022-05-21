import {Button, message} from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import {  addRule } from '@/services/ant-design-pro/api';
import {fetchAllLoginRecord} from "@/services/RecordController";

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
  const [currentRow, setCurrentRow] = useState<Domain.UserLoginRecord>();
  const [selectedRowsState, setSelectedRows] = useState<Domain.UserLoginRecord[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<Domain.UserLoginRecord>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.login-record.uaccount"
          defaultMessage="User Account"
        />
      ),
      dataIndex: 'uAccount',
      render: (_, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {entity?.uAccount}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage
        id="pages.login-record.time"
        defaultMessage="Time" />,
      dataIndex: 'time',
      valueType: 'dateTime',
    },
    {
      title: (
        <FormattedMessage
          id="pages.login-record.ip"
          defaultMessage="IP"
        />
      ),
      dataIndex: 'IP',
    },
    {
      title: (
        <FormattedMessage
          id="pages.login-record.os"
          defaultMessage="os"
        />
      ),
      dataIndex: 'os',
    },
    {
      title: (
        <FormattedMessage
          id="pages.login-record.explorer"
          defaultMessage="Browser"
        />
      ),
      dataIndex: 'explorer',
    },
    {
      title: (
        <FormattedMessage
          id="pages.login-record.where"
          defaultMessage="Device"
        />
      ),
      dataIndex: 'where',
    },
    {
      title: (
        <FormattedMessage
          id="pages.login-record.role"
          defaultMessage="Role"
        />
      ),
      dataIndex: 'role',
      renderText: (val: Number)=> {
        switch (val) {
          case 0:
            return "普通用戶";
          case 1:
            return "銷售者";
          case 2:
            return "管理員";
          default :
            return "";
        }
      }
    },
  ];

  return (
    <PageContainer>
      <ProTable<Domain.UserLoginRecord, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        //@ts-ignore
        request={fetchAllLoginRecord}
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
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
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

      {/*TODO: 这里要改成抽取用户详情的表格*/}
      {/*<Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.goods && (
          <ProDescriptions<Domain.Goods>
            column={2}
            title={currentRow?.goods.title}
            request={async () => ({
              data: currentRow.goods || {},
            })}
            params={{
              id: currentRow?.goods.id,
            }}
            columns={goodsCols as ProDescriptionsItemProps<Domain.Goods>[]}
          />
        )}
      </Drawer>*/}
    </PageContainer>
  );
};

export default TableList;
