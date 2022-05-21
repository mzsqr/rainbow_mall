import {PropsWithChildren} from "react";
import {ModalForm, ProFormText} from "@ant-design/pro-form";
import {message} from "antd";
import {updateSeller} from "@/services/UserController";

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
        const hide = message.loading("更新中");
        await updateSeller({...values, account: props.user.account});
        hide();
        message.success('更新成功');
        return true;
      }}
      layout="vertical"
      initialValues={props.user}
    >

      <ProFormText
        name="nickname"
        width="lg"
        label="昵称"
        placeholder="请输入昵称"
      />

      <ProFormText.Password
        name="password"
        width="lg"
        label="密码"
        placeholder="请输入密码"
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
      />

    </ModalForm>
  );
}

export default UploadForm;
