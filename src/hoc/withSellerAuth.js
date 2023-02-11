//hoc

import { useSellerAuth } from "../customHooks";

const WithSellerAuth = props => useSellerAuth(props) && props.children;

export default WithSellerAuth;