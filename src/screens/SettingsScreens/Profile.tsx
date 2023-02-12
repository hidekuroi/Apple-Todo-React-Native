import { StatusBar } from "expo-status-bar"
import React, { FC, useEffect, useState } from "react"
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  Button,
  TextInput,
  Platform,
} from "react-native"
import { profileAPI } from "../../api/social-api"
import Card from "../../components/Card"
import { useMyTheme } from "../../hooks/useMyTheme"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import ImageView from "react-native-image-viewing"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { SettingsStackParamList } from "../../types/navigation-types"
import * as ImagePicker from "expo-image-picker"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { uploadImage } from "../../features/auth/auth-slice"
import { useLocale } from "../../hooks/useLocale"

type ProfileScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  "Profile"
>

const Profile: FC<ProfileScreenProps> = ({ navigation }) => {
  const { colors } = useMyTheme()
  const i18n = useLocale()
  const { id, email, login } = useTypedSelector((state) => state.auth)

  const [loginValue, setLoginValue] = useState<string>(login)
  const dispatch = useAppDispatch()

  const [photo, setPhoto] = useState("")
  const [viewerVisible, setViewerVisible] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [userImage, setUserImage] = useState<any>()

  useEffect(() => {
    if (!editMode) {
      navigation.setOptions({
        headerRight: () => <Button title={i18n.t('edit')} color={colors.primary} onPress={setEditModeHandler} />,
        headerBackVisible: true,
        headerBackTitle: i18n.t('settingsTab'),
        headerLeft: undefined,
      })
      profileAPI.getProfile(id).then((data) => {
        setPhoto(data.photos.large)
      })
    } else {
      navigation.setOptions({
        headerBackVisible: false,
        headerLeft: () => (
          <Button title={i18n.t('cancel')} color={colors.primary} onPress={() => setEditMode(false)} />
        ),
        headerRight: () => <Button title={i18n.t('done')} color={colors.primary} onPress={() => doneHandler()} />,
      })
    }
  }, [editMode, userImage])

  const setEditModeHandler = () => {
    setEditMode(true)
  }

  const doneHandler = () => {
    // dispatch(uploadImage(photo))
    console.log('doneHandler', userImage)
    userImage && dispatch(uploadImage(userImage))
    setEditMode(false)
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // base64: true,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setPhoto(result.assets[0].uri)
      setUserImage(result.assets[0])
    }
    else {
      console.log('cancel')
    }
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: colors.background }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Card>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
              borderBottomWidth: 0.5,
              borderBottomColor: colors.divider,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                !editMode ? setViewerVisible(true) : pickImage()
              }}
              style={{ borderRadius: 50, height: 100, width: 100 }}
            >
              <View style={{ borderRadius: 50 }}>
                <Image
                  source={{
                    uri: photo ? photo : undefined,
                    height: 100,
                    width: 100,
                  }}
                  style={{ borderRadius: 50, backgroundColor: "lightgray" }}
                />
                {editMode && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: "5%",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "black",
                        paddingHorizontal: 5,
                        opacity: 0.6,
                        borderRadius: 8,
                      }}
                    >
                      <Text style={{ color: "white", opacity: 1 }}>{i18n.t('edit')}</Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {!editMode ? (
            <View>
              <Card.Item text={i18n.t('profileName')} helperText={login} />
              <Card.Item text={i18n.t('profileEmail')} helperText={email} isLast />
            </View>
          ) : (
            <View>
              <TextInput
                value={loginValue}
                style={{
                  color: colors.text,
                  fontSize: 17,
                  fontWeight: "400",
                  marginLeft: 12,
                  paddingVertical: 11,
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.divider,
                }}
                onChangeText={setLoginValue}
                placeholder={"Name"}
              />
              <TextInput
                editable={false}
                value={email}
                style={{
                  color: colors.inputPlaceholder,
                  fontSize: 17,
                  fontWeight: "400",
                  marginLeft: 12,
                  paddingVertical: 11,
                }}
                onChangeText={setLoginValue}
                placeholder={"Email"}
              />
            </View>
          )}
        </Card>
      </View>
      {/* <Modal visible={viewerVisible}></Modal> */}
      {photo && Platform.OS === "ios" && (
        //? maybe i'll change this library on the self made one later
        <ImageView
          imageIndex={0}
          images={[{ uri: photo }]}
          visible={viewerVisible}
          doubleTapToZoomEnabled={true}
          onRequestClose={() => setViewerVisible(false)}
        ></ImageView>
      )}
      <StatusBar style={viewerVisible ? "light" : "auto"} />
    </ScrollView>
  )
}

export default Profile
