import Navbar from "./Navbar";
import GlobalCartNotify from "./GlobalCartNotification";
import CartMenu from "./Pages/StoreCart/CartMenu";
import AdminOptionsBtn from "./Admin/AdminOptionsBtn";
import AdminMenu from "./Admin/AdminMenu";
import PrototypeAlert from "./PrototypeAlert";
import Head from "next/head";
import { refetch } from "@rootDir/redux/localChanges/localValues";
import {
  setMobile,
  resetMobile,
} from "@rootDir/redux/deviceType/deviceTypeSlice";
import { RootState } from "@rootDir/types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const globalState = useSelector((state: RootState) => state);
  const cartState = globalState.cartSlice.value;
  const scrollBlockState = globalState.scrollBlock.value;
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window === undefined || typeof document === undefined) return;

    const rootNextNode = document.getElementById("__next");
    if (!rootNextNode) return;

    const isHiding = cartState.isCartMenuOpen || scrollBlockState.isBlocking;
    rootNextNode.style.overflowY = isHiding ? "hidden" : "scroll";
  }, [cartState.isCartMenuOpen]);

  useEffect(() => {
    dispatch(refetch());

    const isTouchDevice = "ontouchstart" in document.documentElement;

    if (!isTouchDevice) {
      dispatch(resetMobile());
      return;
    }

    dispatch(setMobile());
  }, []);

  return (
    <>
      <Head>
        <title>Shot Store | MarioDev</title>
      </Head>
      <PrototypeAlert />
      <AdminMenu />
      <AdminOptionsBtn />
      <GlobalCartNotify />
      <Navbar />
      <CartMenu />
      {children}
    </>
  );
};

export default Layout;
