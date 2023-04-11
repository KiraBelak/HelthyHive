
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';


const SmallAvatar = styled(Avatar)(() => ({
    width: 50,
    height: 50,
  
  }));
  

const DefAvatar = (props) => {
    const random = Math.random() < 0.5 ? 'micah' : 'avataaars';  
    if (props.invitado){
        return(
            <Stack direction="row" spacing={2}>
            {/* <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              style={{   
                         
             }}  
              badgeContent={
                <SmallAvatar alt="Remy Sharp" src="/badges/bronce.png" />
              }
            > */}
              <Avatar alt="Travis Howard" style={ {width:100, height:100, border: `7px solid ${props.color? props.color : '#F0F0F0'}`,
               borderRadius: `100%`,
               width: `100px`,
               height: `100px`,} } src={`https://avatars.dicebear.com/api/${random}/unknow.svg?background=%23000000`} />
            {/* </Badge> */}
          </Stack>
        )
    }

    return (
        <Stack direction="row" spacing={2}>
     
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          style={{   
                     
         }}  
          badgeContent={
            <SmallAvatar alt="Remy Sharp" src="/badges/bronce.png" />
          }
        >
          <Avatar alt="Travis Howard" style={ {width:100, height:100, border: `7px solid ${props.color? props.color : '#F0F0F0'}`,
           borderRadius: `100%`,
           width: `100px`,
           height: `100px`,} } src={props.image} />
        </Badge>
      </Stack>
    )
}

export default DefAvatar;