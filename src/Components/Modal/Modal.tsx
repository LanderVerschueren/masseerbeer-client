import React from "react";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeInOpacity = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOutOpacity = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

interface ModalContainerProps {
    readonly out: boolean;
}

const ModalContainer = styled.div<ModalContainerProps>`
    z-index: 900;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: ${(props) => (props.out ? "hidden" : "visible")};
    animation: ${(props) => (props.out ? fadeOutOpacity : fadeInOpacity)} 0.15s
        ease-in-out;
    transition: visibility 0.15s linear;
`;

const ModalInner = styled.div`
    background-color: #fff;
    width: 50%;
    border-radius: 3px;
    box-sizing: border-box;
    box-shadow: 0 0.4rem 1rem rgb(54 54 54 / 30%);
    z-index: 902;
`;

const Background = styled.div`
    background-color: rgba(0, 0, 0, 0.33);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 901;
`;

interface Props {
    open: boolean;
    closeDialog: () => void;
    children: React.ReactElement;
    modalTitle: string;
}

const Modal = (props: Props) => {
    const { open, closeDialog, children, modalTitle } = props;

    useEffect(() => {
        if (open) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }, [open]);

    const checkBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.currentTarget.id) {
            closeDialog();
        }
    };

    return (
        <ModalContainer out={!open}>
            <Background id="background" onClick={checkBackgroundClick} />
            <ModalInner>
                <div className="row">
                    <div className="col-12 u-flex u-justify-space-between u-items-center">
                        <div className="uppercase">
                            <h6 className="m-0">{modalTitle}</h6>
                        </div>
                        <button
                            className="btn mb-0 p-0"
                            aria-label="Close"
                            onClick={() => closeDialog()}
                        >
                            <span className="icon">
                                <i className="fa-wrapper fa fa-times"></i>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">{children}</div>
                </div>
            </ModalInner>
        </ModalContainer>
    );
};

export default Modal;
