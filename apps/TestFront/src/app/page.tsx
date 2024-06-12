import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

import styles from './page.module.css';
import { Button } from '@nextui-org/react';

export default function Index() {
  return (
    <div className={styles.page}>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
      <Button>Button</Button>
    </div>
  );
}
