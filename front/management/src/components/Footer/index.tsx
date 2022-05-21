import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '@lingwu 出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'mall',
          title: 'Rainbow Mall',
          href: 'https://lingwu.pro/mall/app',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://gitee.com/li-yirong/rainbow-mall-front',
          blankTarget: true,
        },
        {
          key: 'manage',
          title: 'Rainbow Mall Manage',
          href: 'https://lingwu.pro/mall/manage',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
