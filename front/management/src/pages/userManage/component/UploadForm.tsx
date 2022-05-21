import {PropsWithChildren} from "react";
import {ModalForm, ProFormSelect, ProFormText} from "@ant-design/pro-form";
import {message} from "antd";
import {addUser} from "@/services/UserController";

const UploadForm = (props: PropsWithChildren<any> & {
  trigger: JSX.Element,
  title: string
}) => {

  // @ts-ignore
  return (
    <ModalForm<Omit<Domain.User, 'account'|'regDate'|'avatar'>>
      title={props.title}
      trigger={props.trigger}
      autoFocusFirstInput
      onFinish={async (values) => {
        const hide = message.loading("上传中");
        await addUser({...values});
        hide();
        message.success('上传成功');
        return true;
      }}
      layout="vertical"
    >
      <ProFormText
        name="account"
        width="lg"
        label="账号"
        placeholder="请输入账号（16位）"
        rules={[{ required: true, message: '请输入您的账号', len: 16 }]}
      />

      <ProFormText
        name="nickname"
        width="lg"
        label="昵称"
        placeholder="请输入昵称"
        rules={[{ required: true, message: '请输入您的昵称' }]}
      />

      <ProFormText.Password
        name="password"
        width="lg"
        label="密码"
        placeholder="请输入密码"
        rules={[{ required: true, message: '请 输入您的密码' }]}
      />

      <ProFormText
        type="tel"
        name="phone"
        width="lg"
        label="电话"
        placeholder="请输入电话号码"
      />

      <ProFormText
        type="email"
        name="email"
        width="lg"
        label="邮箱"
        placeholder="请输入邮箱"
        rules={[{ required: true, message: '请输入您的邮箱' }]}
      />

      <ProFormSelect
        name="role"
        label="选择角色"
        valueEnum={{
          1: "销售者",
          2: "管理员",
        }}
        placeholder="请选择角色"
        rules={[{ required: true, message: '请选择您的角色' }]}
      />

    </ModalForm>
  );
}

export default UploadForm;
