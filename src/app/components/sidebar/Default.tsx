import { SvgIcon } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import {
  InsertChartOutlinedOutlined,
  DashboardOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";

const DefaultSidebar = () => {
  const [menus, setMenus] = useState([
    {
      label: "Dashboard",
      route: "/jm/dashboard",
      icon: DashboardOutlined,
    },
    {
      label: "Laporan Lalin Per Hari",
      route: "/jm/report/lalin",
      icon: InsertChartOutlinedOutlined,
    },
    {
      label: "Master Gerbang",
      route: "/jm/master/gate",
      icon: SettingsOutlined,
    },
  ]);
  const router = useRouter();

  return (
    <aside className='sidebar'>
      <div className='main'>
        {menus.map((menu, menuIdx) => (
          <Link
            href={menu.route}
            className={`wrap-menu ${
              router.pathname.includes(menu.route) ? `active` : ""
            }`}
            key={`menu-${menuIdx}`}
          >
            <div className='flex gap-3 px-4 items-center'>
              <SvgIcon component={menu.icon} className='text-white' />
              <p className='font-medium text-sm text-white'>{menu.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default DefaultSidebar;
