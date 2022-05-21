import {Button, message} from 'antd';
import React, { useState, useRef } from 'react';
// @ts-ignore
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import {  addRule } from '@/services/ant-design-pro/api';
import {fetchAllManageRecord} from "@/services/RecordController";

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
  const [currentRow, setCurrentRow] = useState<Domain.ManageRecord>();
  const [selectedRowsState, setSelectedRows] = useState<Domain.ManageRecord[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<Domain.ManageRecord>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.manage-record.eaccount"
          defaultMessage="Account"
        />
      ),
      dataIndex: 'eAccount',
      render: (_, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {entity?.eAccount}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.manage-record.gid"
          defaultMessage="Goods Id"
        />
      ),
      dataIndex: 'gId',
    },

    {
      title: (
        <FormattedMessage
          id="pages.manage-record.uid"
          defaultMessage="User Id"
        />
      ),
      dataIndex: 'uId',
    },
    {
      title: (
        <FormattedMessage
          id="pages.manage-record.time"
          defaultMessage="Time"
        />
      ),
      dataIndex: 'time',
      valueType: 'dateTime',
    },
    {
      title: (
        <FormattedMessage
          id="pages.manage-record.detail"
          defaultMessage="Detail"
        />
      ),
      dataIndex: 'detail',
      search: false
    },

    {
      title: (
        <FormattedMessage
          id="pages.manage-record.remark"
          defaultMessage="Remark"
        />
      ),
      dataIndex: 'reamrk',
      search: false
/*      renderText: (val: Number)=>{
        switch (val) {
          case 0: return "普通用戶";
          case 1: return "銷售者";
          case 2: return "管理員";
          default : return  "";
        }
      }*/
    },
  ];

  return (
    <PageContainer>
      <ProTable<Domain.ManageRecord, API.PageParams>
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
        request={fetchAllManageRecord}
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

      {/*TODO: 這裏要改成用户的抽屉*/}
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
