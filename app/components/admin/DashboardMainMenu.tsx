import { Link, NavLink  } from "@remix-run/react";
import { RiDashboard2Line, RiLayoutFill, RiListView } from "@remixicon/react";
import { NavLink as Mnav } from "@mantine/core";

export default function DashboardMainMenu() {
  return (
    <>
      <Mnav
        component={NavLink}
        to="/admin/dashboard"
        label="Dashboard"
        leftSection={<RiDashboard2Line size="1rem" />}
        variant="light"
      />
      <Mnav
        component={NavLink}
        to="/admin/catalog"
        label="catalog"
        leftSection={<RiListView size="1rem" />}
        variant="light"
      />
      <Mnav
        component={NavLink}
        to="/bundles"
        label="bundles"
        leftSection={<RiListView size="1rem" />}
        variant="light"
      />
      <Mnav
        component={NavLink}
        to="/admin/themes"
        label="Themes"
        leftSection={<RiLayoutFill size="1.5rem" />}
        variant="light"
        fz="xl"
      />
      <Mnav
        component={NavLink}
        to="/admin/templates"
        label="Templates"
        leftSection={<RiLayoutFill size="1.5rem" />}
        variant="light"
        fz="xl"
      />
      <Mnav
        component={NavLink}
        to="/admin/sections"
        label="Sections"
        leftSection={<RiLayoutFill size="1.5rem" />}
        variant="light"
        fz="xl"
      />
      <Mnav
        component={NavLink}
        to="/admin/pages"
        label="Pages"
        leftSection={<RiLayoutFill size="1.5rem" />}
        variant="light"
        fz="lg"
      />
    </>
  );
}
