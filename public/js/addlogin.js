var add = document.createElement("div");
add.innerHTML = `
  <div id="l-w-w">
    <div class="container" id="login-wrapper">
      <div id="login">
        <b>Login</b>
        <form method="post" id="logform">
          <div id="username-w">
            <input name="username" autocomplete="text" type="test" id="username" class="form-control" placeholder="Enter username" required>
          </div>
          <div id="password-w">
            <input autocomplete="current-password" type="password" name="password" id="password" min="6" max="16" class="form-control" placeholder="Enter password" required>
          </div>
          <div id="warn" style="background:#FF7373;box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);display:none;padding:5px 54px;margin:;">to short</div>
          <label>Remember me<input id="check" type="checkbox" name="remember"></label>
          <div id="button-loading-bar" style="width:173px;display:none;background:rgb(194, 194, 194);height:5px;overflow-x:none;margin:auto">
            <div id="button-loading-bar-inner" style="display:;background:rgb(255, 0, 0);height:5px;width:0px;"></div>
          </div>
          <button id="login-btn" class="normbtn" type="submit">submit</button>
        </form>
        <div id="register">
          <button class="diffbtn" id="register-btn">register</button>
        </div>
      </div>
      <div id="regpage">
        <b>register</b>
        <form id="regform">
          <div id="email-w-r">
            <input name="email" autocomplete="email" type="email" id="email-r" class="form-control" placeholder="Enter email">
          </div>
          <div id="warn3" style="background:#FF7373;box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);display:none;padding:5px 54px;margin:;">to short</div>
          <div id="username-w-r">
            <input name="username" autocomplete="text" type="test" id="username-r" class="form-control" placeholder="Enter username" required>
          </div>
          <div id = "st">
            <select id = "state">
              <option value="NAN">please select your state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>
          <div id="password-w-r">
            <input autocomplete="current-password" type="password" name="password" id="password-r" minlength="6" maxlength="16" class="form-control" placeholder="Enter password" required>
          </div>
          <div id="warn2" style="background:#FF7373;box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);display:none;padding:5px 54px;margin:;">to short</div>
          <label>Remember me<input id="check2" type="checkbox" name="remember"></label>
          <button id="regi" class="normbtn" type="submit">submit</button>
        </form>
        <div id="back">
          <button style="padding:5px 70px;" class="diffbtn" id="backbtn">back</button>
        </div>
      </div>
    </div>
  </div>

`
document.body.appendChild(add);