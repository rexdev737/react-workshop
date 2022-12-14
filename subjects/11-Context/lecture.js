import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import * as styles from "./styles";

// Tabs.js
// export { Tabs, TabList, Tab, TabPanels, TabPanel }

const TabsContext = React.createContext();
// <TabsContext.Provider value={...}>

class TabList extends React.Component {
  static contextType = TabsContext;

  render() {
    const { children } = this.props;
    const { activeIndex, onTabSelect } = this.context;

    return (
      <div>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            _isActive: index === activeIndex,
            _onSelect: () => onTabSelect(index)
          })
        )}
      </div>
    );
  }
}

function Tab({ children, disabled, _isActive, _onSelect }) {
  return (
    <div
      style={
        disabled
          ? styles.disabledTab
          : _isActive
            ? styles.activeTab
            : styles.tab
      }
      onClick={disabled ? null : _onSelect}
    >
      {children}
    </div>
  );
}

class TabPanels extends React.Component {
  static contextType = TabsContext;

  render() {
    return (
      <div style={styles.tabPanels}>
        {
          React.Children.toArray(this.props.children)[
            this.context.activeIndex
          ]
        }
      </div>
    );
  }
}

function TabPanel({ children }) {
  return <div>{children}</div>;
}

class Tabs extends React.Component {
  state = { activeIndex: 0 };

  render() {
    return (
      <TabsContext.Provider
        value={{
          activeIndex: this.state.activeIndex,
          onTabSelect: index => this.setState({ activeIndex: index })
        }}
      >
        <div>{this.props.children}</div>
      </TabsContext.Provider>
    );
  }
}

// function Tabs() {
//   var message = 'hi';

//   function div() {
//     function TabList() {
//       console.log(message);
//     }
//   }
// }

// <Router>
//   <div>
//     <div>
//       <div>
//         <Link />
//         <div>
//           <div>
//             <Link />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </Router>;

function App() {
  return (
    <div>
      <Tabs>
        <div className="hot">
          <TabList>
            <Tab>Tacos</Tab>
            <Tab disabled>Burritos</Tab>
            <Tab>Coconut Korma</Tab>
          </TabList>
        </div>
        <div>
          <TabPanels>
            <TabPanel>
              <p>Tacos are delicious</p>
            </TabPanel>
            <TabPanel>
              <p>Sometimes a burrito is what you really need</p>
            </TabPanel>
            <TabPanel>
              <p>Might be your best option</p>
            </TabPanel>
          </TabPanels>
        </div>
      </Tabs>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Sometimes you don't want to specify how deep in the view tree the child
// components need to be, our current implementation expects TabList/TabPanels
// to be immediate children of Tabs, also Tab and TabPanel are required to be
// immediate children of their parent components. We really only care about the
// interactivity between the components, not their hierarchy.
//
// We could recursively check children with each render, which seems like a bad
// plan, so instead we can use a feature called "context".
//
// Wrapping <TabPanels> in a div breaks everything! Instead of using
// cloneElement, let's use context to pass the activeIndex down.

// const TabsContext = React.createContext();

// function TabList({ children, _activeIndex, _onTabSelect }) {
//   return (
//     <div>
//       {React.Children.map(children, (child, index) =>
//         React.cloneElement(child, {
//           _isActive: index === _activeIndex,
//           _onSelect: () => _onTabSelect(index)
//         })
//       )}
//     </div>
//   );
// }

// function Tab({ children, disabled, _isActive, _onSelect }) {
//   return (
//     <div
//       style={
//         disabled
//           ? styles.disabledTab
//           : _isActive
//             ? styles.activeTab
//             : styles.tab
//       }
//       onClick={disabled ? null : _onSelect}
//     >
//       {children}
//     </div>
//   );
// }

// function TabPanels({ children }) {
//   return (
//     <div style={styles.tabPanels}>
//       {React.Children.toArray(children)[this.context.activeIndex]}
//     </div>
//   );
// }

// TabPanels.contextType = TabsContext;

// function TabPanel({ children }) {
//   return <div>{children}</div>;
// }

// class Tabs extends React.Component {
//   state = { activeIndex: 0 };

//   render() {
//     const children = React.Children.map(
//       this.props.children,
//       (child, index) => {
//         if (child.type === TabList) {
//           return React.cloneElement(child, {
//             _activeIndex: this.state.activeIndex,
//             _onTabSelect: index => this.setState({ activeIndex: index })
//           });
//         } else {
//           return child;
//         }
//       }
//     );

//     return (
//       <TabsContext.Provider
//         value={{ activeIndex: this.state.activeIndex }}
//       >
//         <div>{children}</div>
//       </TabsContext.Provider>
//     );
//   }
// }

// function App() {
//   return (
//     <div>
//       <Tabs>
//         <TabList>
//           <Tab>Tacos</Tab>
//           <Tab disabled>Burritos</Tab>
//           <Tab>Coconut Korma</Tab>
//         </TabList>
//         <div>
//           <TabPanels>
//             <TabPanel>
//               <p>Tacos are delicious</p>
//             </TabPanel>
//             <TabPanel>
//               <p>Sometimes a burrito is what you really need</p>
//             </TabPanel>
//             <TabPanel>
//               <p>Might be your best option</p>
//             </TabPanel>
//           </TabPanels>
//         </div>
//       </Tabs>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));

////////////////////////////////////////////////////////////////////////////////
// Wrapping <TabList> also breaks (no more active styles), lets check context
// for the activeIndex and the click handler instead of props.

// const TabsContext = React.createContext();

// function TabList({ children }) {
//   const { activeIndex, onTabSelect } = this.context;

//   return (
//     <div>
//       {React.Children.map(children, (child, index) =>
//         React.cloneElement(child, {
//           _isActive: index === activeIndex,
//           _onSelect: () => onTabSelect(index)
//         })
//       )}
//     </div>
//   );
// }

// TabList.contextType = TabsContext;

// function Tab({ children, disabled, _isActive, _onSelect }) {
//   return (
//     <div
//       style={
//         disabled
//           ? styles.disabledTab
//           : _isActive
//             ? styles.activeTab
//             : styles.tab
//       }
//       onClick={disabled ? null : _onSelect}
//     >
//       {children}
//     </div>
//   );
// }

// function TabPanels({ children }) {
//   return (
//     <div style={styles.tabPanels}>
//       {React.Children.toArray(children)[this.context.activeIndex]}
//     </div>
//   );
// }

// function TabPanel({ children }) {
//   return <div>{children}</div>;
// }

// class Tabs extends React.Component {
//   state = { activeIndex: 0 };

//   render() {
//     return (
//       <TabsContext.Provider
//         value={{
//           activeIndex: this.state.activeIndex,
//           onTabSelect: index => this.setState({ activeIndex: index })
//         }}
//       >
//         <div>{this.props.children}</div>
//       </TabsContext.Provider>
//     );
//   }
// }

// function App() {
//   return (
//     <div>
//       <Tabs>
//         <div>
//           <TabList>
//             <Tab>Tacos</Tab>
//             <Tab disabled>Burritos</Tab>
//             <Tab>Coconut Korma</Tab>
//           </TabList>
//         </div>
//         <div>
//           <TabPanels>
//             <TabPanel>
//               <p>Tacos are delicious</p>
//             </TabPanel>
//             <TabPanel>
//               <p>Sometimes a burrito is what you really need</p>
//             </TabPanel>
//             <TabPanel>
//               <p>Might be your best option</p>
//             </TabPanel>
//           </TabPanels>
//         </div>
//       </Tabs>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.getElementById("app"));
