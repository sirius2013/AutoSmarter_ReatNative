import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectInput from 'react-native-select-input-ios';
import {
  Card,
  CardItem,
  Body,
  Text,
  Button,
  Form,
  View,
  Item,
  Label,
  Input,
  Toast,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

import { ActivityIndicator, FlatList, Image } from 'react-native';
import styles from './styles';
import { getFeatures, createCar, updateCar } from '../../services/cars';
import { renewToken, myCarUpdated, myCarAdded } from '../../actions/user';

const dummyOptions = [
  { value: '', label: 'Select' },
];

const style = {
  buttonPhotos: {
    backgroundColor: '#8D2FAB',
    marginTop: 20,
  },
  viewItem: {
    flex: 1,
    height: 75,
    marginLeft: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#d5d5d5',
  },
  textStyle: {
    fontSize: 15,
    paddingRight: 5,
  },
};

const initialState = {
  id: '',
  title: '',
  images: [],
  base64Images: [],
  makeId: '',
  modelId: '',
  yearId: '',
  mileage: '',
  price: '',

  speeds: '',
  doors: '',
  passengers: '',

  colorId: '',
  interiorId: '',
  bodyStyleId: '',
  transmissionId: '',
  driveTrainId: '',
  features: {
    success: false,
    color_ex: [],
    color_in: [],
    model: [],
    make: [],
    body_style: [],
    transmission: [],
    drive_train: [],
    year: [],
  },
  showModal: false,
  updateComponent: false,
  imageConverting: false,
  showToast: false,
};

class CarForm extends Component {
  static propTypes = {
    me: React.PropTypes.shape({
      auth_token: React.PropTypes.string,
      email: React.PropTypes.string,
    }),
    renewToken: React.PropTypes.func,
    updateStateCar: React.PropTypes.func,
    addCarToState: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.assignValue();
    getFeatures(this.props.me.auth_token)
      .then(
        response => response.json(),
        error => error
      )
      .then((json) => {
        if (json.success) {
          const date = new Date();
          let features = {};
          Object.entries(json).map((arr) => {
            if (arr[0] === 'success') {
              // convert [{success: true}] to { success: true }
              features = { ...features, [arr[0]]: arr[1] };
            } else if (arr[0] === 'model') {
              // convert to [{ id: ..., data: { id: ..., name: ... } }] to { id: [{ label: ... value: ... }] }
              features = {
                ...features,
                [arr[0]]: arr[1]
                  .map(a => ({ id: a.id, data: a.data.map(val => ({ label: val.name, value: val.id })) }))
                  .reduce((map, obj) => {
                    map[obj.id] = obj.data;
                    return map;
                  }, {}),
              };
            } else {
              // convert [{ id: ..., name: ... }] to { label: ..., value: ... }
              features = { ...features, [arr[0]]: arr[1].map((a) => {
                return { label: a.name, value: a.id };
              }) };
            }
          });

          this.setState({
            updateComponent: true,
            features: {
              ...features,
              year: Array.from({ length: ((date.getFullYear() + 1) - 1990) }, (v, k) => k + 1990)
                         .map(y => ({ label: y.toString(), value: y })),
            },
          });
        }
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.updateComponent === true || nextState.showToast === true;
  }

  onSubmitMake = (value) => {
    this.setState({
      makeId: value,
      modelId: '',
      updateComponent: true,
    }, () => {
      this.setState({
        title: [
          this.getName('make', 'makeId'),
          this.getName('model', 'modelId'),
          this.getName('year', 'yearId'),
        ].join(' '),
      });
    });
  }

  onSubmitModel = (value) => {
    this.setState({
      modelId: value,
      updateComponent: true,
    }, () => {
      this.setState({
        title: [
          this.getName('make', 'makeId'),
          this.getName('model', 'modelId'),
          this.getName('year', 'yearId'),
        ].join(' '),
      });
    });
  }

  onSubmitYear = (value) => {
    this.setState({
      yearId: value,
      updateComponent: true,
    }, () => {
      this.setState({
        title: [
          this.getName('make', 'makeId'),
          this.getName('model', 'modelId'),
          this.getName('year', 'yearId'),
        ].join(' '),
      });
    });
  }

  onSubmitColor = value => this.setState({ colorId: value, updateComponent: false })
  onSubmitInterior = value => this.setState({ interiorId: value, updateComponent: false })
  onSubmitBodyStyle = value => this.setState({ bodyStyleId: value, updateComponent: false })
  onSubmitTransmission = value => this.setState({ transmissionId: value, updateComponent: false })
  onSubmitDriveTrain = value => this.setState({ driveTrainId: value, updateComponent: false })

  getName(obj, stateName) {
    let name = '';
    if (obj === 'model') {
      if (this.state.makeId !== '') {
        this.state.features[obj][this.state.makeId].map((val) => {
          if (val.value.toString() === this.state[stateName].toString()) {
            name = val.label;
          }
        });
      }
    } else {
      this.state.features[obj].map((val) => {
        if (val.value.toString() === this.state[stateName].toString()) {
          name = val.label;
        }
      });
    }
    return name;
  }

  assignValue() {
    if (this.props.selectedCar !== undefined) {
      const car = this.props.selectedCar;
      this.setState({
        images: car.images.map(img => ({ uri: img, isNew: false })),
        id: car.id,
        title: car.title,

        makeId: car.make_id,
        modelId: car.model_id,
        yearId: car.year,
        colorId: car.color_ex_id,
        interiorId: car.color_in_id,
        bodyStyleId: car.body_style_id,
        transmissionId: car.transmission_id,
        driveTrainId: car.drive_train_id,

        mileage: String(car.mileage),
        price: String(car.price),
        speeds: String(car.speeds),
        doors: String(car.doors),
      });
    }
  }

  saving() {
    let promises = null;
    if (this.props.selectedCar === undefined) {
      promises = createCar(this.state, this.props.me.auth_token, this.props.me.email)
    } else {
      promises = updateCar(this.state, this.props.me.auth_token, this.props.me.email)
    }

    promises
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.renewToken(response.headers.map['x-user-token'][0]);
          }
          return response.json();
        },
        error => error,
      )
      .then((json) => {
        if (json.success === true) {
          if (this.props.selectedCar !== undefined) {
            this.props.updateStateCar(json.car, this.props.selectedIndex);
          } else {
            this.setState({
              ...initialState,
              images: [],
              base64Images: [],
              updateComponent: true,
              features: { ...this.state.features },
            });
            this.props.addCarToState(json.car);
          }
          Toast.show({ text: 'Car saved', position: 'bottom', buttonText: 'Okay', type: 'success' });
        } else {
          Toast.show({ text: 'Failed to save car', position: 'bottom', buttonText: 'Okay', type: 'danger' });
        }
      });
  }

  saveCar() {
    if (this.state.images.length === 0) {
      this.saving();
    } else {
      const oldImages = this.state.images.filter(img => img.isNew === false).map(img => img.uri);

      this.convertToBase64().then((images) => {
        this.setState({
          base64Images: oldImages.concat(images),
          updateComponent: true,
        }, () => {
          this.saving();
        });
      });
    }
  }

  convertToBase64 = () => {
    const promises = [];
    this.state.images.forEach((img) => {
      if (img.isNew === true) {
        promises.push(RNFS.readFile(img.uri, 'base64'));
      }
    });
    return Promise.all(promises);
  }

  toggleLoading() {
    if (this.state.features.success === true) {
      return (
        <View>
          <Button
            style={style.buttonPhotos}
            onPress={this._selectImages}
            full
          >
            <Text>ADD PHOTOS</Text>
          </Button>
          <View>
            <FlatList
              data={this.state.images}
              extraData={this.state}
              keyExtractor={(item, index) => index}
              numColumns={2}
              renderItem={this.renderImage}
            />
          </View>
          <Form>
            { this.renderSelectInput('Make', this.state.makeId, this.onSubmitMake, this.state.features.make) }
            { this.renderSelectInput('Model', this.state.modelId, this.onSubmitModel, this.state.features.model) }
            { this.renderSelectInput('Year', this.state.yearId, this.onSubmitYear, this.state.features.year) }
            { this.renderItem('Mileage', 'mileage') }
            { this.renderItem('Price', 'price') }
            { this.renderItem('Speeds', 'speeds') }
            { this.renderItem('Doors', 'doors') }
            { this.renderItem('Passengers', 'passengers') }
            { this.renderSelectInput('Car color', this.state.colorId, this.onSubmitColor, this.state.features.color_ex) }
            { this.renderSelectInput('Car interior', this.state.interiorId, this.onSubmitInterior, this.state.features.color_in) }
            { this.renderSelectInput('Body style', this.state.bodyStyleId, this.onSubmitBodyStyle, this.state.features.body_style) }
            { this.renderSelectInput('Transmission', this.state.transmissionId, this.onSubmitTransmission, this.state.features.transmission) }
            { this.renderSelectInput('Drive train', this.state.driveTrainId, this.onSubmitDriveTrain, this.state.features.drive_train) }
          </Form>
          <View style={style.viewItem}>
            <Button
              onPress={() => this.saveCar()}
              full
            >
              <Text>{ this.props.selectedCar === undefined ? 'ADD CAR' : 'UPDATE CAR' }</Text>
            </Button>
          </View>
        </View>
      );
    } else {
      return(<ActivityIndicator size='large' animating />)
    }
  }

  _selectImages = () => {
    const options = {
      title: 'Select Images',
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imgs = this.state.images;
        const source = { uri: response.uri, isNew: true };
        imgs.push(source);
        this.setState({ images: imgs, updateComponent: true });
      }
    });
  }

  renderImage = img => (
    <Card style={{ flex: 0.5 }}>
      <CardItem>
        <Body>
          <Image
            source={{ uri: img.item.uri }}
            style={{ flex: 1, width: 125, minHeight: 200 }}
            resizeMode="cover"
          />
        </Body>
      </CardItem>
    </Card>
  )

  renderSelectInput(fieldName, stateId, onSubmit, options) {
    opts = [...dummyOptions]
    if(fieldName == 'Model'){
      if(this.state.makeId !== ''){
        opts = [...opts, ...options[this.state.makeId]]
      }
    }else{
      opts = [...opts, ...options]
    }
    return (
      <View key={fieldName} style={style.viewItem}>
        <Text style={style.textStyle}>{fieldName}</Text>
        <SelectInput
          mode={'dropdown'}
          value={stateId}
          options={opts}
          onSubmitEditing={onSubmit}
        />
      </View>
    )
  }

  renderItem = (fieldName, stateName) => (
    <Item key={fieldName} style={styles.itemField} floatingLabel>
      <Label style={styles.itemLabel}>{fieldName}</Label>
      <Input
        value={this.state[stateName]}
        style={styles.itemInput}
        onChangeText={(text) => { this.setState({ [stateName]: String(text), updateComponent: true }); }}
        keyboardType="phone-pad"
      />
    </Item>
  )

  render() {
    return (
      <View>
        { this.toggleLoading() }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  me: state.user,
});

const mapDispatchToProps = dispatch => ({
  renewToken: token => dispatch(renewToken(token)),
  updateStateCar: (car, index) => dispatch(myCarUpdated(car, index)),
  addCarToState: car => dispatch(myCarAdded(car)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarForm);
