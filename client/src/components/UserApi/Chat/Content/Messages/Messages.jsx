import React, {useEffect, useState} from 'react';
import useStyles from "./Messages.styles";
import {Button, Grid, IconButton, TextareaAutosize} from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Message from "./Message-item";
import {useSelector} from "react-redux";

import { io } from "socket.io-client";

let socket;


const Messages = () => {
    const classes = useStyles()
    const [text, setText] = useState('');
    const [message, setSt] = useState('');
    const profile = useSelector(state => state.user.info)

    //Sockets
    const url = 'http://localhost:4000/'

    useEffect(() => {
        socket = io(url)

        socket.on('CONNECT:GREETING', message => {
            setSt(message)
        })
        socket.emit('CLIENT:SEND_MESSAGE', {
            user: profile,
            text: 'Hello world!'
        })

        return () => {
            socket.emit('disconnected')
            socket.off()
        }
    }, [url])

    return (
        <div className={classes.root}>
            <div className={classes.messages}>
                <Message
                    name='Paul McCartney'
                    source='/src'
                    time='19:48'
                    text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, officia.'
                    recieved={true}
                />
                <Message
                    name='Paul McCartney'
                    source={profile?.photoURL}
                    time='19:48'
                    text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, officia.'
                    recieved={false}
                />
                {message}


            </div>
            <div className={classes.addMessageArea}>
                <Grid>
                    <TextareaAutosize onChange={e => setText(e.target.value)} value={text} className={classes.textarea} aria-label="minimum height" rowsMin={5} placeholder="Write a text" />
                </Grid>
                <Grid container justify='space-between' className={classes.more}>
                    <Grid item className={classes.aditional__options}>
                        <div className={classes.emoji}>
                            <IconButton>
                                <InsertEmoticonIcon className={classes.attachfile} />
                            </IconButton>
                            <IconButton>
                                <AttachFileIcon className={classes.attachfile} />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Messages;