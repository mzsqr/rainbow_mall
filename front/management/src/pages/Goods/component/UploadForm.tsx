import {PropsWithChildren, useState} from "react";
import {ModalForm, ProFormDigit, ProFormGroup, ProFormText, ProFormTextArea} from "@ant-design/pro-form";
import {message, Space, Tooltip} from "antd";
import PhotoWall from "@/pages/Goods/component/PhotoWall";
import {UploadFile} from "antd/es/upload/interface";
import {uploadPhotos} from "@/services/GoodsController";
import {objToFormData} from "@/services/utils";

const UploadForm = (props: PropsWithChildren<any> & {
  trigger: JSX.Element,
  title: string
}) => {

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // @ts-ignore
  return (
    <ModalForm<Omit<Domain.Goods, 'id'|'addDate'|'status'>>
      title={props.title}
      trigger={props.trigger}
      autoFocusFirstInput
      onFinish={async (values) => {
        const hide = message.loading("上传中");
        const res = objToFormData({
          ...values,
        });
        for (const item of fileList) {
          //@ts-ignore
          res.append("files", item.originFileObj);
        }
        await uploadPhotos(res);
        hide();
        message.success('提交成功');
        return true;
      }}
      modalProps={{
        onCancel(){
          setFileList([])
        }
      }}
      layout="vertical"
    >

      <ProFormText
        name="title"
        width="lg"
        label="商品标题"
        placeholder="请输入商品标题"
        required={true}
        />



      <ProFormTextArea
        name="category"
        width="lg"
        label="类别"
        placeholder="输入用分号分隔的种类"
      />

      <ProFormTextArea
        name="description"
        width="lg"
        label="商品描述"
        placeholder="请输入商品描述"
        required={true}
        />

      <ProFormGroup>
        <ProFormDigit
          name="volume"
          width="md"
          label="商品数量"
          placeholder="请输入商品数量"
          required={true}
          fieldProps={{
            precision: 0
          }}
        />

        <ProFormDigit
          name="price"
          width="md"
          label="商品价格"
          placeholder="请输入商品价格"
          required={true}
        />
      </ProFormGroup>

      <Space size={10} direction="vertical">
        <Tooltip title={"第一张图片将会在卡片上显示给用户"}>
          <label>商品图片:</label>
        </Tooltip>

        <PhotoWall
          //@ts-ignore
          max={9}
          fileList={fileList}
          onChange={
            //@ts-ignore
            ({fileList})=>setFileList(fileList)
          }
        />
      </Space>

    </ModalForm>
  );
}

export default UploadForm;
