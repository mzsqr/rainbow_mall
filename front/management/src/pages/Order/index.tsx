import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import {addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import UpdateForm, { FormValueType } from '../TableList/components/UpdateForm';
import {getOrdersForBuyer, outOrder, tipGot} from "@/services/OrderController";

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

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const Order: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Domain.Order>();
  const [selectedRowsState, setSelectedRows] = useState<Domain.Order[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<Domain.Order>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.order.id"
          defaultMessage="ID"
        />
      ),
      dataIndex: 'id',
      tip: 'The rule name is the unique key',
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
      title: <FormattedMessage id="pages.goods.title" defaultMessage="Goods Title" />,
      dataIndex: 'title',
      valueType: 'textarea',
      render: (_, record) => {
        return record.goods?.title
      }
    },
    {
      title: <FormattedMessage id="pages.goods.price" defaultMessage="Goods Price" />,
      dataIndex: 'price',
      valueType: 'textarea',
      render: (_, record) => {
        return record.goods?.price+"元"
      }
    },
    {
      title: <FormattedMessage id="pages.order.num" defaultMessage="Goods Number" />,
      dataIndex: 'num',
      valueType: 'textarea',
    },
    {
      title: <FormattedMessage id="pages.order.address" defaultMessage="Address" />,
      dataIndex: 'address',
      valueType: 'textarea',
    },
    {
      title: (
        <FormattedMessage
          id="pages.order.total"
          defaultMessage="Total Money"
        />
      ),
      dataIndex: 'total',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      render: (_, record) => {
        // @ts-ignore
        return record.num*record.goods?.price+"元";
      }
    },
    {
      title: <FormattedMessage id="pages.order.status" defaultMessage="Status" />,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        2: {
          text: (
            <FormattedMessage
              id="pages.order.status.2"
              defaultMessage="Not Outing"
            />
          ),
          status: 'Default',
        },
        4: {
          text: (
            <FormattedMessage id="pages.order.status.4" defaultMessage="Outing" />
          ),
          status: 'Processing',
        },
        5: {
          text: (
            <FormattedMessage id="pages.order.status.5" defaultMessage="Got" />
          ),
          status: 'Success',
        },
        6: {
          text: (
            <FormattedMessage
              id="pages.order.status.6"
              defaultMessage="Backing"
            />
          ),
          status: 'Error',
        },
        7: {
          text: (
            <FormattedMessage
              id="pages.order.status.7"
              defaultMessage="Backed"
            />
          ),
          status: 'Error',
        },
      },
    },
    {
      title: (
        <FormattedMessage
          id="pages.order.time"
          defaultMessage="Order Time"
        />
      ),
      sorter: true,
      dataIndex: 'orderTime',
      valueType: 'dateTime',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
         const res = [];

        if (record.status === 2){
          res.push(
            <a
              key="out"
              onClick={async () => {
                try{
                  await outOrder(record);
                  message.success("发货成功");
                }catch (e) {
                  message.error("发货失败，请重试");
                }
                setCurrentRow(record);
              }}
            >
              <FormattedMessage id="pages.order.out" defaultMessage="发货"/>
            </a>,
          );
        }

        if (record.status === 4){
          res.push(
            <a
              key="out"
              onClick={async () => {
                try{
                  await tipGot(record);
                  message.success("提醒成功");
                }catch (e) {
                  message.error("提醒失败，请重试");
                }
                setCurrentRow(record);
              }}
            >
              <FormattedMessage id="pages.order.tips" defaultMessage="Tips"/>
            </a>,
          );
        }

        if (record.status === 6){
          res.push(
            <a
              key="backOk"
              onClick={() => {
                //TODO: 退货逻辑
                setCurrentRow(record);
              }}
            >
              <FormattedMessage id="pages.order.backOk" defaultMessage="确认退货"/>
            </a>,
          );
        }

        return res;
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<Domain.Order, API.PageParams>
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
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        //@ts-ignore
        request={getOrdersForBuyer}
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
              await handleRemove(selectedRowsState);
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
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.id && (
          <ProDescriptions<Domain.Order>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<Domain.Order>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Order;
