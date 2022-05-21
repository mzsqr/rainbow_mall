import {Badge} from "react-bootstrap";

/**
 *
 * @param props{
 *     {
 *         title: string
 *     }
 * }
 * @returns {JSX.Element}
 * @constructor
 */
export default function NotifyLine(props) {

    return (
      <>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <p><a href={"#"}><Badge style={{color: "orange", backgroundColor: "#ccffff"}} >热点</Badge>{" "}{props.title}</a></p>
      </>
    );
}
