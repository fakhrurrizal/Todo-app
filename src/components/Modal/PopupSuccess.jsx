import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { CgDanger } from "react-icons/cg";

function PopupSuccess({ show }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <div>
      <AlertDialog
        isOpen={show}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="flex">
            <AlertDialogBody>
              <span className="py-2 flex">
                {" "}
                <CgDanger className="text-[24px] text-green-700 mr-3" />{" "}
                Activity berhasil dihapus
              </span>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}
export default PopupSuccess;
