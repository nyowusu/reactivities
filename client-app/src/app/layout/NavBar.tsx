import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface IProps {
  openForm: () => void;
}

export default function NavBar({ openForm }: IProps) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: 10, paddingBottom: 5 }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" onClick={openForm} />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
