import {PropsWithChildren, useState} from "react";
import {ModalForm, ProFormDigit, ProFormGroup, ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-form";
import {message, Space, Tooltip} from "antd";
import {UploadFile} from "antd/es/upload/interface";
import {addPhotoOfGoods, rmPhotoOfGoods, updateGoods} from "@/services/GoodsController";
import StaticPhotoWall from "@/pages/Goods/component/StaticPhotoWall";

const UploadForm = (props: PropsWithChildren<any> & {
  trigger: JSX.Element,
  title: string
}) => {
  //@ts-ignore
  const [fileList, setFileList] = useState<UploadFile[]>(props.goods.photos);

  // @ts-ignore
  return (
    <ModalForm<Omit<Domain.Goods, 'id'|'addDate'>>
      title={props.title}
      trigger={props.trigger}
      autoFocusFirstInput
      onFinish={async (values) => {
        const hide = message.loading("更新中");
        await updateGoods({...values, id: props.goods.id});
        hide();
        message.success('更新成功');
        return true;
      }}
      layout="vertical"
      initialValues={props.goods}
    >

      <ProFormText
        name="title"
        width="lg"
        label="商品标题"
        placeholder="请输入商品标题"
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
      />

      <ProFormGroup>
        <ProFormDigit
          name="volume"
          width="md"
          label="商品数量"
          placeholder="请输入商品数量"
          fieldProps={{
            precision: 0
          }}
        />

        <ProFormDigit
          name="price"
          width="md"
          label="商品价格"
          placeholder="请输入商品价格"
        />
      </ProFormGroup>

      <ProFormSelect
        name="status"
        label="状态"
        width={"md"}
        valueEnum={{
          0: '正常',
          1: '下架',
          2: '无货',
        }}
        />

      <Space size={10} direction="vertical">
        <Tooltip title={"第一张图片将会在卡片上显示给用户"}>
          <label>商品图片:</label>
        </Tooltip>

        <StaticPhotoWall
          //@ts-ignore
          max={9}
          fileList={fileList}
          onChange={
            //@ts-ignore
            async ({file, fileList})=> {
              console.log(file)
              if (file.status === "removed"){
                await rmPhotoOfGoods(props.goods.id, file);
              }else if(file.status === "done"){
                const data = new FormData();
                data.append("gId", props.goods.id);
                data.append("photo", file.originFileObj);
                await addPhotoOfGoods(data);
              }
              setFileList(fileList);
            }
          }
        />
      </Space>

    </ModalForm>
  );
}

export default UploadForm;
